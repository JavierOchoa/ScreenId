import {FC, PropsWithChildren} from "react";
import {TrendingMovieResult, TrendingTvResult} from "../interfaces";
import styles from "../styles/MediaCard.module.css";
import Link from "next/link";
import Image from "next/image";

interface Props {
    movie?: TrendingMovieResult
    show?: TrendingTvResult
}

let MediaCard:FC<PropsWithChildren<Props>> = ({movie, show})=>{
    return(
        <div className={styles.trendingCard}>
            <Link href={`/${movie ? `movie` : show ? 'tv' : null}/${movie?.id || show?.id || null}`}>
                <a>
                    <div className={styles.cardImageTitle}>
                        <Image className={styles.coverImage} src={`https://image.tmdb.org/t/p/w500${movie?.poster_path || show?.poster_path || null}`} alt={movie?.title || show?.name || 'null'} width={256} height={384} blurDataURL={'/favicon.ico'} placeholder="blur" />
                        <p className={styles.trendingCardMediaTitle}>{movie?.title || show?.name || null}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default MediaCard;