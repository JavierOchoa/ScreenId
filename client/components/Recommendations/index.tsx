import {FC, PropsWithChildren} from "react";
import {ImovieRecommendations, ITVRecommendations} from "../../interfaces";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/Recommendations.module.css';

interface Props {
    movieRecommendations?: ImovieRecommendations;
    tvRecommendations?: ITVRecommendations;
    type: string;
}

const Recommendations:FC<PropsWithChildren<Props>> = ({movieRecommendations, tvRecommendations, type}) => {
    if(movieRecommendations){
        const data = movieRecommendations.results.filter((movieRecommendation) => movieRecommendation.backdrop_path !== null)
        return(
            <div>
                <h2>Recommendations</h2>
                <div className={styles.recommendationsContainer}>
                    {
                        data.map((recommendation, i) => {
                            return(
                                <Link key={i} href={`/movie/${recommendation.id}`}>
                                    <div className={styles.recommendationsCard}>
                                        <div className={styles.recommendationsImage}>
                                            <Image src={`https://image.tmdb.org/t/p/w780${recommendation.backdrop_path}`}
                                                   alt={recommendation.title}
                                                   width={280}
                                                   height={150}
                                            />
                                        </div>

                                        <div className={styles.recommendationsTest}>
                                            <p className={styles.recommendationTitle}>
                                                {recommendation.title}
                                                <span className={styles.recommendationYear}>
                                                        {` (${recommendation.release_date.split("-")[0]})`}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                            )
                        })
                    }
                </div>
            </div>
        )
    } else if(tvRecommendations) {
        const data = tvRecommendations.results.filter((tvRecommendation) => tvRecommendation.backdrop_path !== null)
        return(
            <div>
                <h2>Recommendations</h2>
                <div className={styles.recommendationsContainer}>
                    {
                        data.map((recommendation, i) => {
                            return(
                                <Link key={i} href={`/tv/${recommendation.id}`}>
                                    <div className={styles.recommendationsCard}>
                                        <div className={styles.recommendationsImage}>
                                            <Image src={`https://image.tmdb.org/t/p/w780${recommendation.backdrop_path}`}
                                                   alt={recommendation.name}
                                                   width={280}
                                                   height={150}
                                            />
                                        </div>

                                        <div className={styles.recommendationsTest}>
                                            <p className={styles.recommendationTitle}>
                                                {recommendation.name}
                                                <span className={styles.recommendationYear}>
                                                        {` (${recommendation.first_air_date.split("-")[0]})`}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                            )
                        })
                    }
                </div>
            </div>
        )
    }
    return (<></>)

}

export default Recommendations;