import {FC, PropsWithChildren} from "react";
import {DetailedTV} from "../../interfaces";
import Image from "next/image";
import styles from '../../styles/Episode.module.css'

interface Props {
    episode: DetailedTV["last_episode_to_air"]
    type: string
}

const Episode: FC<PropsWithChildren<Props>> = ({episode, type}) => {
    return(
        <div className={styles.episodeContainer}>
            <Image src={`https://image.tmdb.org/t/p/w300${episode.still_path}`} alt={episode.name} width={300} height={169}/>
            <div className={styles.episodeInformationContainer}>
                <div className={styles.titleDateContainer}>
                    <p className={styles.episodeEmphasis}>{episode.name}</p>
                    <p>{type==='latest' ? 'Aired on: ': 'Will air on: '}<span className={styles.episodeEmphasis}>{` ${(episode.air_date).split("-").join("/")}`}</span></p>
                </div>
                <p className={styles.episodeOverview}>{episode.overview}</p>
            </div>
        </div>
    )
}

export default Episode;