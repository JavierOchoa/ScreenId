import { PropsWithChildren, FC} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {DetailedMovie} from '../../interfaces'
import {Layout} from "../../layouts";
import Image from "next/image";
import styles from '../../styles/Movie.module.css'

interface Props {
    movieInfo: DetailedMovie;
}

const MovieExtended: FC<PropsWithChildren<Props>> = ({movieInfo}) => {
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
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ( context) => {
    const {query} = context
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${query.id}?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    return {props:{
        movieInfo: data
        }
    }
}

export default MovieExtended;