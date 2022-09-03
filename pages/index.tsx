 import {FC, PropsWithChildren, useState} from "react";
import {GetServerSideProps} from "next";
import Image from "next/image";
import Link from 'next/link'
import {Layout} from "../layouts";
import axios from "axios";
import {TrendingMovieData, TrendingTvData, TrendingPersonData} from "../interfaces";
 import { Carousel } from 'react-responsive-carousel';
import styles from '../styles/Home.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
 import TrendingSection from "../components/TrendingSection";

 interface trendingData {
     trendingMovieData: TrendingMovieData,
     trendingTvData:TrendingTvData,
     trendingPersonData: TrendingPersonData
 }

const Home: FC<PropsWithChildren<trendingData>> = ({trendingMovieData, trendingTvData, trendingPersonData}) => {
     //TODO: dynamic content in slider
     const [movieInSlider, setMovieInSlider] = useState(0);

     return (
    <Layout title={'Home'} pageDescription={'Discover the latest FilterContent, TV Shows and Artists'}>
      <Carousel
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          swipeable={true}
          emulateTouch={true}
          interval={5000}
          transitionTime={1000}
      >
          {trendingMovieData.results.slice(0,10).map((movie, i) =>{
              return(
                  <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}} key={i}>
                      <Link href={`movie/${movie.id}`}>
                          <a className={styles.anchor}>
                              <div className={styles.movieSliderContainer}>
                                  <div>
                                      <h3 className={styles.movieSliderMovieTitle}>{movie.title}</h3>
                                      <div>
                                          <p className={styles.movieSliderTitles}>Overview</p>
                                          <p className={styles.movieSliderOverview}>{movie.overview}</p>
                                          <p className={styles.movieSliderTitles}>Rating</p>
                                          <p>{movie.vote_average.toFixed(1)}/10</p>
                                      </div>
                                  </div>
                                  <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={400} height={600}/>
                              </div>
                          </a>
                      </Link>
                  </div>
              )
          })}
      </Carousel>
        <TrendingSection length={10} movies={trendingMovieData}/>
        <TrendingSection length={10} shows={trendingTvData} />
        <TrendingSection length={10} people={trendingPersonData} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {data: trendingMovieData} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB}`)
    const {data: trendingTvData} = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB}`)
    const {data: trendingPersonData} = await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.NEXT_PUBLIC_TMDB}`)

    return {props: {
            trendingMovieData,
            trendingTvData,
            trendingPersonData}
    }
}

export default Home
