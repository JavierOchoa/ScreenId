import axios from 'axios';
import { IUserFavorite } from '../interfaces';
import useAuth from './useAuth';

export default function favoritesHelper() {
    const {userCookie} = useAuth();

    async function addToFavorites(media: IUserFavorite){
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
    
    return {addToFavorites, getFavorites}
}