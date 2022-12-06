import {FC, PropsWithChildren} from "react";
import {TrendingPersonResult} from "../interfaces";
import styles from "../styles/PersonCard.module.css";
import Link from "next/link";
import Image from "next/image";

interface Props {
    id: number,
    original_name: string,
    profile_path: string
    character?: string
    type: string
}

const PersonCard: FC<PropsWithChildren<Props>> = ({id,original_name, profile_path, type, character}) =>{
    return(
        <div className={styles.PersonCard}>
            <Link href={`/person/${id}`}>
                <a>
                    <Image className={type === 'trending' ? styles.trendingImage :  styles.castImage} src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={original_name} width={130} height={200} />
                    <p className={styles.personName}>{original_name}</p>
                    {character && <p className={styles.personCharacter}>{character}</p>}
                </a>
            </Link>
        </div>
    )
}

export default PersonCard;