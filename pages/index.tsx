 import {FC, PropsWithChildren, useState} from "react";
import Image from "next/image";
import {GetServerSideProps} from "next";
import {Layout} from "../layouts";
import axios from "axios";
import {TrendingMovieData, TrendingTvData, TrendingPersonData} from "../interfaces";
 import { Carousel } from 'react-responsive-carousel';
import styles from '../styles/Home.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

 interface trendingData {
     trendingMovieData: TrendingMovieData,
     trendingTvData:TrendingTvData,
     trendingPersonData: TrendingPersonData
 }

const Home: FC<PropsWithChildren<trendingData>> = ({trendingMovieData, trendingTvData, trendingPersonData}) => {
     const [movieInSlider, setMovieInSlider] = useState(0);

     return (
    <Layout title={'Home'} pageDescription={'Discover the latest Movies, TV Shows and Artists'}>
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
                  <div className={styles.movieSliderContainer} key={i}>
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
              )
          })}
      </Carousel>
        <div>
            <h2>Trending Movies</h2>
            <div className={styles.trendingSection}>
                {trendingMovieData.results.slice(0,10).map((movie, i)=>{
                    return (
                        <div className={styles.trendingCard} key={i}>
                            <Image className={styles.coverImage} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={130} height={200} blurDataURL={'/favicon.ico'} placeholder="blur" />
                            <p className={styles.trendingCardMovieTitle}>{movie.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        <div>
            <h2>Trending TV Shows</h2>
            <div className={styles.trendingSection}>
                {trendingTvData.results.slice(0,10).map((show, i)=>{
                    return (
                        <div className={styles.trendingCard} key={i}>
                            <Image className={styles.coverImage} src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} width={130} height={200} />
                            <p className={styles.trendingCardMovieTitle}>{show.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        <div>
            <h2>Trending People</h2>
            <div className={styles.trendingSection}>
                {trendingPersonData.results.filter(person=> person.profile_path !== null).slice(0,10).map((person, i)=>{
                    return (
                        <div className={styles.trendingCard} key={i}>
                            <Image className={styles.personImage} src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.original_name} width={130} height={200} />
                            <p className={styles.trendingCardMovieTitle}>{person.original_name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
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
