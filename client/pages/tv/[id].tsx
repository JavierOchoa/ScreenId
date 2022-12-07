import {FC, PropsWithChildren} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {DetailedTV, MovieCredits, MovieVideos, ITVRecommendations, ExternalLinks, Comment} from "../../interfaces";
import {Layout} from "../../layouts";
import styles from "../../styles/Movie.module.css";
import Image from "next/image";
import PeopleSection from "../../components/People";
import VideoSection from "../../components/VideoSection";
import Recommendations from "../../components/Recommendations";
import SidebarSocials from "../../components/SidebarSocials";
import Episode from "../../components/Episode";
import Seasons from "../../components/Seasons";
import Comments from "../../components/Comments";

interface Props {
    TVData: DetailedTV
    TVCast: MovieCredits
    TVVideos: MovieVideos
    TVRecommendations: ITVRecommendations
    TVExternals: ExternalLinks,
    comments: Comment[];
}

const TVPage:FC<PropsWithChildren<Props>> = ({TVData, TVCast, TVVideos, TVRecommendations, TVExternals, comments}) => {
    return(
        <Layout title={TVData.name} pageDescription={TVData.overview}>
            <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${TVData.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className={styles.infoContainer}>
                    <Image src={`https://image.tmdb.org/t/p/original${TVData.poster_path}`} alt={TVData.name} width={320} height={400}/>
                    <div className={styles.movieDetails}>
                        <h1>{TVData.name} <span className={styles.yearTitle}>({TVData.first_air_date.split('-')[0]})</span></h1>
                        <div className={styles.underTitleDetails}>
                            {
                                TVData.genres.map((genre, i) => {
                                    return (
                                        <p className={styles.underTitleGenres} key={i}>{genre.name}{i !== TVData.genres.length - 1 ? ',' : null}</p>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.headerSection}>
                            <p className={styles.movieTagline}>{TVData.tagline}</p>
                        </div>
                        <div className={styles.headerSection}>
                            <p className={styles.detailTitles}>Overview</p>
                            <p className={styles.movieOverview}>{TVData.overview}</p>
                        </div>
                        <div className={styles.headerBottom}>
                            <div>
                                <p className={styles.detailTitles}>Ratings</p>
                                <span className={styles.yearTitle}>{TVData.vote_average.toFixed(1)}/10</span>
                            </div>
                            <div className={styles.productionCompanies}>
                                <p className={styles.detailTitles}>Production Companies</p>
                                {TVData.production_companies.map((company, i) => {
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
                    <PeopleSection castPeople={TVCast}/>
                    {TVData.status === 'Returning Series' &&
                        <div>
                            {TVData.next_episode_to_air &&
                                <div>
                                    <h2>Upcoming Episode</h2>
                                    <Episode episode={TVData.next_episode_to_air} type={'next'}/>
                                </div>
                            }
                            <h2>Latest Episode</h2>
                            <Episode episode={TVData.last_episode_to_air} type={'latest'}/>
                        </div>
                    }
                    <Seasons seasons={TVData.seasons}/>
                    <h2>Videos</h2>
                    <VideoSection videoData={TVVideos}/>
                    <Recommendations tvRecommendations={TVRecommendations} type={'tv'}/>
                    <Comments mediaId={TVData.id} mediaType={"tv"} mediaComments={comments}/>
                </div>
                <div className={styles.sideBar}>
                    <div className={styles.sideBarSection}>
                        <p className={styles.sideBarTitle}>Status</p>
                        <p className={styles.sideBarInfo}>{TVData.status}</p>
                    </div>
                    <div className={styles.sideBarSection}>
                        <p className={styles.sideBarTitle}>Created by</p>
                        {TVData.created_by.map((creator, i)=>{
                            return(
                                <p key={i} className={styles.sideBarInfo}>{creator.name}</p>
                            )
                        })}
                    </div>
                    <div className={styles.sideBarSection}>
                        <p className={styles.sideBarTitle}>Made in</p>
                        {TVData.production_countries.map((country, i)=>{
                            return(
                                <p key={i} className={styles.sideBarInfo}>{country.name}</p>
                            )
                        })}
                    </div>
                    <SidebarSocials socialData={TVExternals}/>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query} = context
    const {data: TVData} = await axios.get(`https://api.themoviedb.org/3/tv/${query.id}?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    const {data: TVCast} = await axios.get(`https://api.themoviedb.org/3/tv/${query.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    const {data: TVVideos} = await axios.get(`https://api.themoviedb.org/3/tv/${query.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    const {data: TVRecommendations} = await axios.get(`https://api.themoviedb.org/3/tv/${query.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=1`)
    const {data: TVExternals} = await axios.get(`https://api.themoviedb.org/3/tv/${query.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB}`)
    const {data: comments} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_MEDIA}/tv/${query.id}/comments`);
    return{props:{
            TVData,
            TVCast,
            TVVideos,
            TVRecommendations,
            TVExternals,
            comments
        }
    }
}


export default TVPage;