import React, {FC, Key, PropsWithChildren, useState} from "react";
import {TrendingMovieResult, TrendingTvResult} from "../interfaces";
import MediaCard from "./MediaCard";
import styles from '../styles/FilterContent.module.css';
import Select from 'react-select'
import {MediaGenres, Genre} from "../interfaces";
import axios from "axios";
import {movies} from "../slices/trendingMoviesSlice";
import {useSelector, useDispatch} from 'react-redux'
import {shows} from "../slices/trendingShowsSlice";


interface Props {
    trendingMovieData?: TrendingMovieResult[]
    trendingTvData?: TrendingTvResult[]
    genres: MediaGenres
}

type MediaData = TrendingMovieResult[] | TrendingTvResult[]

const FilterContent: FC<PropsWithChildren<Props>> = ({trendingMovieData, genres, trendingTvData}) => {
    const [currentIndex, setCurrentIndex] = useState(2)
    const [popularitySelector, setPopularitySelector] = useState(10);
    const [genreSelector, setGenreSelector] = useState([-1]);
    const [sortSelector, setSortSelector] = useState('');

    const dispatch = useDispatch()

    let genreOptions = genres.genres.map((genre) => {
        return {value: genre.id, label: genre.name}
    });
    const sortOptions = [
        {value: 'pAsc', label: 'Popularity Ascending'},
        {value: 'pDesc', label: 'Popularity Descending'},
        {value: 'rAsc', label: 'Rating Ascending'},
        {value: 'rDesc', label: 'Rating Descending'},
        {value: 'tAsc', label: 'Title Ascending'},
        {value: 'tDesc', label: 'Title Descending'},
    ]

    const filteredMedia = (mediaData: any) => {
        let base = mediaData;
        if (sortSelector !== '') {
            let copy = base?.map((media: any) => media);
            if (sortSelector === 'pAsc') {
                base = copy?.sort((a: { popularity: string; }, b: { popularity: string; }) => Number(a.popularity) - Number(b.popularity));
            }
            if (sortSelector === 'pDesc') {
                base = copy?.sort((a: { popularity: string; }, b: { popularity: string; }) => Number(b.popularity) - Number(a.popularity));
            }
            if (sortSelector === 'rAsc') {
                base = copy?.sort((a: { vote_average: string; }, b: { vote_average: string; }) => Number(a.vote_average) - Number(b.vote_average));
            }
            if (sortSelector === 'rDesc') {
                base = copy?.sort((a: { vote_average: string; }, b: { vote_average: string; }) => Number(b.vote_average) - Number(a.vote_average));
            }
            trendingMovieData && sortSelector === 'tAsc'
                ? base = copy?.sort((a: { title: string; }, b: { title: string; }) => a.title?.localeCompare(b.title))
                : sortSelector === 'tDesc'
                    ? base = copy?.sort((a: { title: string; }, b: { title: string; }) => b.title?.localeCompare(a.title))
                    : null
            trendingTvData && sortSelector === 'tAsc'
                ? base = copy?.sort((a: { name: string; }, b: { name: string; }) => a.name?.localeCompare(b.name))
                : sortSelector === 'tDesc'
                    ? base = copy?.sort((a: { name: string; }, b: { name: string; }) => b.name?.localeCompare(a.name))
                    : null
        }
        if (genreSelector[0] !== -1) {
            base = base?.filter((movie: { genre_ids: number[]; }) => genreSelector.every(genre => movie.genre_ids.includes(genre)))
        }
        base = base?.filter((movie: { vote_average: number; }) => (movie.vote_average <= popularitySelector))
        return base;
    }

    const handleGenreSelector = (e: { value: number, label: string }[]) => setGenreSelector(e.map((genre ) => genre.value));
    const handlePopularitySelector = (e: React.ChangeEvent<HTMLInputElement>) => setPopularitySelector(Number((e.target.value)));
    const handleSort = (e: { value: string, label: string }) => {
        if (e === null) return setSortSelector('');
        setSortSelector(e.value)
    }
    const handleLoadMore = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${trendingMovieData?'movie':'tv'}/popular?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=${currentIndex}`)
        setCurrentIndex(currentIndex + 1);
        trendingMovieData?dispatch(movies(data.results)):dispatch(shows(data.results))
    }
    const handleResetFilters = () => {
        setPopularitySelector(10);
        setGenreSelector([-1]);
        setSortSelector('10');
    }
    return (
        <div className={styles.mainContainer}>
            <div>
                <div className={styles.filterContainer}>
                    <p className={styles.filtersTitle}>Filter Options</p>
                    <div>
                        <p className={styles.filterSubtitle}>Sort Results By</p>
                        <Select isClearable onChange={(e)=>handleSort(e || {value: '', label: ''})} options={sortOptions}/>
                    </div>
                    <div>
                        <p className={styles.filterSubtitle}>Genres</p>
                        <Select isMulti isClearable onChange={(e)=> {
                            let genres = e.map((genre ) => genre)
                            handleGenreSelector(genres)
                        }} options={genreOptions}/>
                    </div>
                    <div>
                        <p className={styles.filterSubtitle}>User Score</p>
                        <div className={styles.scoreSliderValueContainer}>
                            <input className={styles.rangeSlider} type={'range'} name={'difficulty'}
                                   value={popularitySelector} min={1} max={10} step={0.1}
                                   onChange={(e)=>handlePopularitySelector(e)}/>
                            <p>{popularitySelector}</p>
                        </div>
                    </div>
                    <button className={styles.filterResetButton} onClick={handleResetFilters}>Reset</button>
                </div>
            </div>
            <div className={styles.mediaContent}>
                <div className={styles.resultContainer}>
                    {trendingMovieData && filteredMedia(trendingMovieData)?.map((movie: TrendingMovieResult | undefined, i: Key | null | undefined)=>{
                            return(
                                <MediaCard key={i} movie={movie}/>
                            )
                        })}
                    {trendingTvData && filteredMedia(trendingTvData)?.map((show: TrendingTvResult | undefined, i: Key | null | undefined)=>{
                        return(
                            <MediaCard key={i} show={show}/>
                        )
                    })}
                    </div>
                    <button className={styles.filterLoadMoreButton} onClick={handleLoadMore}>Load More</button>
                </div>
            </div>
    )
}

export default FilterContent;