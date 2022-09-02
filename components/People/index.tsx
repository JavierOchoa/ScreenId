import {FC, PropsWithChildren} from "react";
import {MovieCredits, TrendingPersonData} from "../../interfaces";
import Image from "next/image";
import styles from "../../styles/People.module.css";
import Link from "next/link";
import PersonCard from "../PersonCard";

interface castingData {
    castPeople: MovieCredits
}

const PeopleSection: FC<PropsWithChildren<castingData>> = ({castPeople}) => {
    return(
        <div className={styles.personContainer}>
            {castPeople.cast.map((person, i) => {
                    return(
                        <PersonCard key={i} id={person.id} original_name={person.original_name} profile_path={person.profile_path || 'null'} type={'cast'} character={person.character}/>
                    )
                })
            }
        </div>
    )
}

export default PeopleSection;