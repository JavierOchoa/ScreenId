import { PropsWithChildren, FC} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {Comment, DetailedMovie, ExternalLinks, MovieCredits, MovieVideos, ImovieRecommendations} from '../../interfaces'
import {Layout} from "../../layouts";
import Image from "next/image";
import styles from '../../styles/Movie.module.css'
import PeopleSection from "../../components/People";
import VideoSection from "../../components/VideoSection";
import MovieRecommendations from "../../components/Recommendations";
import SidebarSocials from "../../components/SidebarSocials";
import Comments from "../../components/Comments";

interface Props {
    movieInfo: DetailedMovie;
    movieCast: MovieCredits;
    movieVideos: MovieVideos;
    movieRecommendations: ImovieRecommendations;
    movieExternals: ExternalLinks;
    mockComments: Comment[];
}

const MovieExtended: FC<PropsWithChildren<Props>> = ({movieInfo, movieCast, movieVideos, movieRecommendations, movieExternals, mockComments}) => {
    const dollarUSLocale = Intl.NumberFormat('en-US');
    console.log(mockComments);
    return (
        <Layout title={movieInfo.title} pageDescription={movieInfo.overview}>
            <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className={styles.infoContainer}>
                    <Image src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`} alt={movieInfo.title} width={320} height={400}/>
                    <div className={styles.movieDetails}>
                        <h1>{movieInfo.title} <span className={styles.yearTitle}>({movieInfo.release_date.split('-')[0]})</span></h1>
                        <div className={styles.underTitleDetails}>
                            <p className={styles.underTitleReleaseDate}>{movieInfo.release_date.split("-").join("/")}</p>
                            {
                                movieInfo.genres.map((genre, i) => {
                                    return (
                                        <p className={styles.underTitleGenres} key={i}>{genre.name}{i !== movieInfo.genres.length - 1 ? ',' : null}</p>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.headerSection}>
                            <p className={styles.movieTagline}>{movieInfo.tagline}</p>
                        </div>
                        <div className={styles.headerSection}>
                            <p className={styles.detailTitles}>Overview</p>
                            <p className={styles.movieOverview}>{movieInfo.overview}</p>
                        </div>
                        <div className={styles.headerBottom}>
                            <div>
                                <p className={styles.detailTitles}>Ratings</p>
                                <span className={styles.yearTitle}>{movieInfo.vote_average.toFixed(1)}/10</span>
                            </div>
                            <div className={styles.productionCompanies}>
                                <p className={styles.detailTitles}>Production Companies</p>
                                {movieInfo.production_companies.map((company, i) => {
                                    return(
                                        <p key={i}>{company.name}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.pageContent}>
                <div className={styles.mainContainer}>
                    <h2>Cast</h2>
                    <PeopleSection castPeople={movieCast}/>
                    <h2>Videos</h2>
                    <VideoSection videoData={movieVideos}/>
                    <MovieRecommendations movieRecommendations={movieRecommendations} type={'movie'}/>
                    <Comments comments={mockComments}/>
                </div>
                <div className={styles.sideBar}>
                    <div className={styles.sideBarSection}>
                        <p className={styles.sideBarTitle}>Status</p>
                        <p className={styles.sideBarInfo}>{movieInfo.status}</p>
                    </div>
                    <div className={styles.sideBarSection}>
                        <p className={styles.sideBarTitle}>Made in</p>
                        {movieInfo.production_countries.map((country, i)=>{
                            return(
                                <p key={i} className={styles.sideBarInfo}>{country.name}</p>
                            )
                        })}
                    </div>
                    {movieInfo.revenue !== 0 &&
                        <div className={styles.sideBarSection}>
                            <p className={styles.sideBarTitle}>Revenue</p>
                            <p className={styles.sideBarInfo}>${dollarUSLocale.format(movieInfo.revenue)}</p>
                        </div>
                    }
                <SidebarSocials socialData={movieExternals}/>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ( context) => {
    const {query} = context;
    const {data: movieInfo} = await axios.get(`https://api.themoviedb.org/3/movie/${query.id}?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`);
    const {data: movieCast} = await axios.get(`https://api.themoviedb.org/3/movie/${query.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`);
    const {data: movieVideos} = await axios.get(`https://api.themoviedb.org/3/movie/${query.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`);
    const {data: movieRecommendations} = await axios.get(`https://api.themoviedb.org/3/movie/${query.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=1`);
    const {data: movieExternals} = await axios.get(`https://api.themoviedb.org/3/movie/${query.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB}`);
    const {data: mockComments} = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');

    return {
        props:{
            movieInfo,
            movieCast,
            movieVideos,
            movieRecommendations,
            movieExternals,
            mockComments
        }
    }
}

export default MovieExtended;