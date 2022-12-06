import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, PropsWithChildren, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteItems, cleanFavoriteItems } from '../slices/userFavoriteSlice';
import { RootState } from "../store";
import { IUserFavorite } from "../interfaces";
import useAuth from "../utils/useAuth";
import MediaCard from "./MediaCard";
import styles from '../styles/UserFavorites.module.css';
import Image from "next/image";
import movie from '../public/movie.svg';
import tv from '../public/tv.svg';
import Link from "next/link";
import useFavorites from "../utils/useFavorites";

interface Props {
    favoritesData?: IUserFavorite[]
}

const UserFavorites: FC<PropsWithChildren<Props>> = ({favoritesData}) => {
    const {isAuthenticated} = useAuth();
    const {removeFromFavorites, favoriteMedia, emptyFavorites} = useFavorites();
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     if(isAuthenticated){
    //         getFavorites()
    //             .then(response => dispatch(favoriteItems(response!)))
    //     }
    //     return () =>{
    //         dispatch(cleanFavoriteItems())
    //     }
    // },[isAuthenticated])

    if (emptyFavorites){
        return <h3>No favorites</h3>
    }

    return (
        <div className={styles.favoritesContainer}>
                {favoriteMedia.map((media, i)=> {
                    return (
                        <div key={i} className={styles.favoriteItem} style={i===0 ? {}:{borderTop: '1px solid black'}}>
                            <Image src={media.type==='movie'? movie : tv} alt={media.type}/>
                            <Link href={`${media.type}/${media.id}`}>
                                <a>
                                    <p className={styles.favoriteTitle}>{media.title}</p>
                                </a>
                            </Link>
                            <button onClick={()=>removeFromFavorites(media)} className={styles.removeButton}>REMOVE</button>
                        </div>
                    )
                })
                }
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