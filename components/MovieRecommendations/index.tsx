import {FC, PropsWithChildren} from "react";
import {ImovieRecommendations} from "../../interfaces/ImovieRecommendations";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/MovieRecommendations.module.css';

interface Props {
    recommendations: ImovieRecommendations;
}

const MovieRecommendations:FC<PropsWithChildren<Props>> = ({recommendations}) => {
    const data = recommendations.results.filter((recommendation) => recommendation.backdrop_path !== null)
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
                                        <p className={styles.recommendationTitle}>{recommendation.title} <span className={styles.recommendationYear}>({recommendation.release_date.split("-")[0]})</span></p>
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

export default MovieRecommendations;