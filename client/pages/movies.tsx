import {Layout} from "../layouts";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {TrendingMovieData} from "../interfaces";
import FilterContent from "../components/FilterContent";
import {MediaGenres} from "../interfaces";
import { useSelector, useDispatch } from 'react-redux'
import { movies, clean } from '../slices/trendingMoviesSlice'
import {RootState} from "../store";

interface Props {
    trendingMovieData: TrendingMovieData;
    genres: MediaGenres;
}

const Movies:FC<PropsWithChildren<Props>> = ({trendingMovieData, genres}) => {
    const movieData = useSelector((state: RootState) => state.trendingMovies.value)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(movies(trendingMovieData.results))
        return ()=> {
            dispatch(clean())
        }
    },[])
    return(
        <Layout title={'Trending Movies'} pageDescription={'Take a look at currently trending movies'}>
            <FilterContent trendingMovieData={movieData} genres={genres}/>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>{
    const {data: trendingMovieData} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=1`)
    const {data: genres} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    return {
        props:{
            trendingMovieData,
            genres
        }
    }
}
export default Movies;