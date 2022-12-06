import {FC, PropsWithChildren} from "react";
import {TrendingMovieData, TrendingPersonData, TrendingTvData} from "../interfaces";
import styles from "../styles/TrendingSection.module.css";
import MediaCard from "./MediaCard";
import People from "./People";
import PersonCard from "./PersonCard";

interface Props {
    length: number
    movies?: TrendingMovieData
    shows?: TrendingTvData
    people?: TrendingPersonData
}

const TrendingSection: FC<PropsWithChildren<Props>> = ({length, movies, shows, people}) => {
    return(
        <div className={styles.trendingContainer}>
            <h2>{movies ? 'Trending Movies' : shows ? 'Trending TV Shows' : 'Trending People'}</h2>
            <div className={styles.trendingSection}>
                {movies &&
                    movies.results.slice(0, length).map((movie, i)=>{
                        return(
                            <MediaCard key={i} movie={movie}/>
                        )
                    })
                }
                {shows &&
                    shows.results.slice(0, length).map((show, i)=>{
                        return(
                            <MediaCard key={i} show={show}/>
                        )
                    })
                }
                {
                    people &&
                    people.results.filter(person=> person.profile_path !== null).slice(0,10).map((person, i)=>{
                        return(
                            <PersonCard key={i} id={person.id} original_name={person.original_name} profile_path={person.profile_path||'null'} type={'trending'}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TrendingSection;