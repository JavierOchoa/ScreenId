import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getCookie, setCookie, removeCookie} from "typescript-cookie";
import { IUserFavorite, UpdatedPasswordResponse, UserInfo } from "../interfaces";
import { userInfo, cleanUserInfo } from "../slices/userInfoSlice";
import { favoriteItems, cleanFavoriteItems} from "../slices/userFavoriteSlice";
import { RootState } from "../store";
import useFavorites from "./useFavorites";


export default function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userCookie, setUserCookie] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector((state: RootState) => state.userInfo.value)
    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(()=>{
        const theCookie = getCookie('SID');
        if(theCookie) {
            setIsLoading(false);
            setIsAuthenticated(true);
            setUserCookie(theCookie);
        }
        setIsLoading(false)
    },[])

    useEffect(()=>{
        if(isAuthenticated && !user.fullName){
            getUser(userCookie)
        }
        // if(isAuthenticated) {
        //     if(favoriteMedia.length===0) getFavorites()
        // }
    }, [isAuthenticated])

    async function login(email: string, password:string){
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, {email, password})
            if(!data.token) {
                const {response} = data
                console.log('sss')
                if(data.statusCode === 400) setErrorMessage(data.message)
            }
            setCookie('SID', data.token, {sameSite: 'strict', secure: true})
            router.reload()
        } catch (e:any) {
            const {data} = e.response;
            if (data.statusCode === 400 ) setErrorMessage(data.message[0])
            setErrorMessage(data.message)
        }
    }

    async function signup(fullName: string, email: string, password: string, confirmPassword: string){
        if(password !== confirmPassword) {
            setErrorMessage('Please type the same password on both fields')
            return ;
        }
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/register`, {fullName, email, password})
            if(!data.token) return data;
            setCookie('SID', data.token, {sameSite: 'strict', secure: true})
            router.reload()
        } catch (e:any) {
            const {data} = e.response;
            if (data.statusCode === 400 ) setErrorMessage(data.message[0])
            setErrorMessage(data.message)
        }
    }

    function logout(){
        removeCookie('SID');
        router.reload();
    }

    async function getUser(cookie: string){
        try{
            const {data} = await axios.get<UserInfo>(`${process.env.NEXT_PUBLIC_BACKEND}/auth/user`, {
                headers: {Authorization: `Bearer ${cookie}`}
            })
            dispatch(userInfo(data))
        } catch (e) {
            console.log(e)
        }
    }

    async function updatePassword(currentPassword: string, newPassword: string){
        try{
            const { data } = await axios.post<UpdatedPasswordResponse>(`${process.env.NEXT_PUBLIC_BACKEND}/auth/update`, {
                currentPassword,
                newPassword,
                type: 'password',
            }, {
                headers: {Authorization: `Bearer ${userCookie}`}
            })
            return data;
        } catch (e) {
            console.log(e)
        }

    }

    async function updateEmail(currentPassword: string, newEmail: string){
        try{
            const { data } = await axios.post<UpdatedPasswordResponse>(`${process.env.NEXT_PUBLIC_BACKEND}/auth/update`, {
                currentPassword,
                newEmail,
                type: 'email',
            }, {
                headers: {Authorization: `Bearer ${userCookie}`}
            })
            if(!data.successful) return data;
            await getUser(userCookie);
            return data;

        } catch (e) {
            console.log(e)
        }

    }

    async function deleteAccount(currentPassword: string){
        try {
            const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/auth/delete`, {
                data: {
                    currentPassword,
                }, headers : {
                    Authorization: `Bearer ${userCookie}`
                }
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    return {signup, login, logout, isAuthenticated, user, userCookie, updatePassword, updateEmail, isLoading, deleteAccount, errorMessage}
}