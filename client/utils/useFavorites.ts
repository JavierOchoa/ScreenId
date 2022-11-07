import axios from 'axios';
import { IUserFavorite } from '../interfaces';
import useAuth from './useAuth';
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {useEffect, useState} from "react";
import {cleanFavoriteItems, favoriteItems, addItemToFavorites, removeItemFromFavorites} from "../slices/userFavoriteSlice";

export default function useFavorites() {

    const favoriteMedia = useSelector((state: RootState) => state.userFavorites.value)

    const [emptyFavorites, SetEmptyFavorites] = useState(true)

    const {userCookie, isAuthenticated} = useAuth();

    const dispatch = useDispatch()

    useEffect(()=>{
        if(favoriteMedia.length!==0){
            SetEmptyFavorites(false)
        }
    },[favoriteMedia])

    // useEffect(()=>{
    //     if(isAuthenticated && favoriteMedia.length===0){
    //         getFavorites()
    //             .then(response => dispatch(favoriteItems(response!)))
    //     }
    //     return () =>{
    //         dispatch(cleanFavoriteItems())
    //     }
    // },[isAuthenticated])

    async function addToFavorites(media: IUserFavorite){
        dispatch(addItemToFavorites(media))
        const {data} = await axios.post<IUserFavorite>(`${process.env.NEXT_PUBLIC_BACKEND_MEDIA}/add`, {
                id: media.id,
                profilePath: media.profilePath,
                title: media.title,
                type: media.type
            }, {
                headers: {Authorization: `Bearer ${userCookie}`}
            }
        )
        return data;
    }

    async function removeFromFavorites(media: IUserFavorite){
        const {id, type} = media
        dispatch(removeItemFromFavorites(media));
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_MEDIA}/remove`, {
            data: {
                id,
                type,
            },
            headers : { Authorization: `Bearer ${userCookie}` }
        })
        return data
    }

    async function getFavorites() {
        try{
            const {data} = await axios.get<IUserFavorite[]>(`${process.env.NEXT_PUBLIC_BACKEND_MEDIA}/favorites`, {
                headers: {Authorization: `Bearer ${userCookie}`}
            })

            return data
            
        } catch (e) {
            console.log(e)
        }
        
    }
    
    return {addToFavorites, getFavorites, favoriteMedia, emptyFavorites, removeFromFavorites}
}