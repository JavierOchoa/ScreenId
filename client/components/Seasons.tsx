import {FC, PropsWithChildren} from "react";
import {DetailedTV} from "../interfaces";
import Image from "next/image";
import styles from '../styles/Seasons.module.css'

interface Props {
    seasons: DetailedTV["seasons"]
}

const Seasons: FC<PropsWithChildren<Props>> = ({seasons}) => {
    return (
        <div>
            <h2>Seasons</h2>
            {
                seasons.filter(season => season.name !== 'Specials').map((season, i) => {
                    return(
                        <div key={i} className={styles.seasonContainer}>
                            <Image src={`https://image.tmdb.org/t/p/w154${season.poster_path}`} alt={season.name} width={154} height={231}/>
                            <div className={styles.seasonInformationContainer}>
                                <div className={styles.titleDateContainer}>
                                    <p className={styles.seasonEmphasis}>{season.name}</p>
                                    <p>{'Released on: '}<span className={styles.seasonEmphasis}>{` ${(season.air_date).split("-").join("/")}`}</span></p>
                                </div>
                                <p className={styles.episodeOverview}>{season.overview ? season.overview : 'No description'}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Seasons;