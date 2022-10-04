import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, PropsWithChildren, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteItems, cleanFavoriteItems } from '../slices/userFavoriteSlice';
import { RootState } from "../store";
import { IUserFavorite } from "../interfaces";
import useAuth from "../utils/useAuth";
import MediaCard from "./MediaCard";

interface Props {
    favoritesData?: IUserFavorite[]
}

const UserFavorites: FC<PropsWithChildren<Props>> = ({favoritesData}) => {
    const favoriteMedia = useSelector((state: RootState) => state.userFavorites.value)
    const {getFavorites, isAuthenticated} = useAuth();
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(isAuthenticated);
        
        if(isAuthenticated){
            getFavorites()
                .then(response => dispatch(favoriteItems(response!)))
        }

        return () =>{ 
            dispatch(cleanFavoriteItems())
        }
    },[isAuthenticated])
    console.log(favoriteMedia);
    
    return (
        <div>
            {/* <div> */}
                {favoriteMedia.map((media)=> {
                    return (
                        <div>
                            <p>{media.title}</p>
                        </div>
                    )
                })
                }
            {/* </div> */}
        </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async(context) => {
//     const {getFavorites} = useAuth();
//     const data = await getFavorites()
    
//     return {
//         props: {
//             favoritesData: data
//         }
//     }
// }


export default UserFavorites;