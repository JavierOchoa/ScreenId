import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getCookie, setCookie, removeCookie} from "typescript-cookie";
import { IUserFavorite, UpdatedPasswordResponse, UserInfo } from "../interfaces";
import { userInfo, cleanUserInfo } from "../slices/userInfoSlice";
import { favoriteItems, cleanFavoriteItems} from "../slices/userFavoriteSlice";
import { RootState } from "../store";


export default function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userCookie, setUserCookie] = useState('')
    const user = useSelector((state: RootState) => state.userInfo.value)
    const favoriteMedia = useSelector((state: RootState) => state.userFavorites.value)
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{
        const theCookie = getCookie('SID');
        if(theCookie) {
            setIsAuthenticated(true);
            setUserCookie(theCookie);
        }
    },[])

    useEffect(()=>{
        if(isAuthenticated && !user.fullName){
            getUser(userCookie)
        }
    }, [isAuthenticated])

    async function login(email: string, password:string){
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_AUTH}/login`, {email, password})
            if(!data.token) return data;
            setCookie('SID', data.token, {sameSite: 'strict', secure: true})
            router.reload()
        } catch (e) {
            console.log(e)
        }
    }

    async function signup(fullName: string, email: string, password: string){
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_AUTH}/register`, {fullName, email, password})
            if(!data.token) return data;
            setCookie('SID', data.token, {sameSite: 'strict', secure: true})
            router.reload()
        } catch (e) {
            console.log(e)
        }
    }

    function logout(){
        removeCookie('SID');
        router.reload();
    }

    async function getUser(cookie: string){
        try{
            const {data} = await axios.get<UserInfo>(`${process.env.NEXT_PUBLIC_BACKEND_AUTH}/user`, {
                headers: {Authorization: `Bearer ${cookie}`}
            })
            dispatch(userInfo(data))
        } catch (e) {
            console.log(e)
        }
    }

    async function updatePassword(currentPassword: string, newPassword: string){
        try{
            const { data } = await axios.post<UpdatedPasswordResponse>(`${process.env.NEXT_PUBLIC_BACKEND_AUTH}/update`, {
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

    return {signup, login, logout, isAuthenticated, user, userCookie, updatePassword}
}