import {FC, PropsWithChildren} from "react";
import {IUserFavorite, TrendingMovieResult, TrendingTvResult} from "../interfaces";
import styles from "../styles/MediaCard.module.css";
import Link from "next/link";
import Image from "next/image";
import favoritesHelper from '../utils/favoritesHelper'

interface Props {
    movie?: TrendingMovieResult
    show?: TrendingTvResult
}

let MediaCard:FC<PropsWithChildren<Props>> = ({movie, show})=>{
    const {addToFavorites} = favoritesHelper();

    const saveToFavorites = () => {
        const mediaToSave: IUserFavorite = {
            id: movie?.id || show?.id || 0,
            title: movie?.title || show?.name || '',
            profilePath: movie?.poster_path || show?.poster_path || '',
            type: movie ? 'movie' : 'tv'
        }
        const savedMedia = addToFavorites(mediaToSave)
        return savedMedia;
    }
    return(
        <div className={styles.trendingCard}>
            <div className={styles.cardImageTitle}>
                <div onClick={()=>saveToFavorites()} className={styles.likeButton}>
                    <Image src="/save.svg" alt="save" width={20} height={20}/>
                </div>
                <Link href={`/${movie ? `movie` : show ? 'tv' : null}/${movie?.id || show?.id || null}`}>
                    <a>
                        <Image className={styles.coverImage} src={`https://image.tmdb.org/t/p/w500${movie?.poster_path || show?.poster_path || null}`} alt={movie?.title || show?.name || 'null'} width={256} height={384} blurDataURL={'/favicon.ico'} placeholder="blur" />
                        <p className={styles.trendingCardMediaTitle}>{movie?.title || show?.name || null}</p>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default MediaCard;