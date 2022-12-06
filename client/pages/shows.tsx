import {Layout} from "../layouts";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {TrendingTvData} from "../interfaces";
import FilterContent from "../components/FilterContent";
import {MediaGenres} from "../interfaces";
import { useSelector, useDispatch } from 'react-redux'
import { shows, cleanShows} from '../slices/trendingShowsSlice'
import {RootState} from "../store";

interface Props {
    trendingShowsData: TrendingTvData;
    genres: MediaGenres;
}

const Movies:FC<PropsWithChildren<Props>> = ({trendingShowsData, genres}) => {
    const showsData = useSelector((state: RootState) => state.trendingShows.value)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(shows(trendingShowsData.results))
        return ()=> {
            dispatch(cleanShows())
        }
    },[])
    return(
        <Layout title={'Trending Movies'} pageDescription={'Take a look at currently trending movies'}>
            <FilterContent trendingTvData={showsData} genres={genres}/>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>{
    const {data: trendingShowsData} = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=1`)
    const {data: genres} = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    return {
        props:{
            trendingShowsData,
            genres
        }
    }
}
export default Movies;