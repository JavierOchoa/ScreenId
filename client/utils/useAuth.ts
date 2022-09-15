import axios from "axios";
import { sensitiveHeaders } from "http2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie, setCookie} from "typescript-cookie";


export default function useAuth(){
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userCookie, setUserCookie] = useState('')
    const [user, setUser] = useState({})

    useEffect(()=>{
        const theCookie = getCookie('SID');
        if(theCookie) {
            setIsAuthenticated(true);
            setUserCookie(theCookie);
        }
    },[])

    // if(isAuthenticated && Object.keys(user).length === 0){
    //         axios.get(`${process.env.NEXT_PUBLIC_BACKEND_AUTH}/user`, {
    //             headers: {Authorization: `Bearer ${userCookie}`} 
    //         })
    //         .then(({data})=> setUser(data))
    //         .catch((e)=>console.log(e));
    
    // }

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

    return {login, isAuthenticated, user}
}