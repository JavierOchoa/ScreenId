import {Layout} from "../layouts";
import {FC, PropsWithChildren, useState} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {TrendingMovieData, TrendingMovieResult} from "../interfaces";
import MediaCard from "./MediaCard";
import styles from '../styles/FilterContent.module.css';
import Select from 'react-select'
import {MediaGenres} from "../interfaces/";


interface Props {
    trendingMovieData?: TrendingMovieResult[]
    genres: MediaGenres
}

const FilterContent:FC<PropsWithChildren<Props>> = ({trendingMovieData, genres}) => {
    const [popularitySelector, setPopularitySelector] = useState(10);
    const [filteredMovies, setFilteredMovies] = useState(trendingMovieData?.map(movie=>movie))
    let opy = genres.genres.map((genre,i)=>{
        return {value: genre.name.toLowerCase(), label: genre.name}
    });
    //TODO: filter logic depending on options
    const options = [
        { value: 'pAsc', label: 'Popularity Ascending' },
        { value: 'pDesc', label: 'Popularity Descending' },
        { value: 'rAsc', label: 'Rating Ascending' },
        { value: 'rDesc', label: 'Rating Descending' },
        { value: 'tAsc', label: 'Title Ascending' },
        { value: 'tDesc', label: 'Title Descending' },
    ]
    const genreSelect = (e:Event) => console.log(e);
    const handlePopularitySelector = (e:Event) => setPopularitySelector(Number((e.target as HTMLTextAreaElement).value))
    return(
            <div className={styles.mainContainer}>
                <div>
                    <div className={styles.filterContainer}>
                        <p className={styles.filtersTitle}>Filter Options</p>
                        {/*ASC DESC POPULARITY*/}
                        <div>
                            <p className={styles.filterSubtitle}>Sort Results By</p>
                            <Select isClearable options={options} />
                        </div>
                        {/*GENRES*/}
                        <div>
                            <p className={styles.filterSubtitle}>Genres</p>
                            <Select isMulti onChange={genreSelect} options={opy} />
                        </div>
                        {/* TODO: Popularity Slider*/}
                        <div>
                            <p className={styles.filterSubtitle}>User Score</p>
                            <div className={styles.scoreSliderValueContainer}>
                                <input className={styles.rangeSlider} type={'range'} name={'difficulty'} value={popularitySelector} min={1} max={10} step={0.1} onChange={handlePopularitySelector}/>
                                <p>{popularitySelector}</p>
                            </div>
                        </div>
                        <button className={styles.filterSearchButton}>Search</button>
                    </div>
                </div>
                <div className={styles.resultContainer}>
                    {filteredMovies?.map((movie, i)=>{
                        return(
                            <MediaCard key={i} movie={movie}/>
                        )
                    })}
                </div>
            </div>
    )
}

export default FilterContent;