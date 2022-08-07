import {FC, PropsWithChildren} from "react";
import {MovieCredits} from "../../interfaces";
import Image from "next/image";
import styles from "../../styles/People.module.css";

interface castingData {
    people: MovieCredits
}

const PeopleSection: FC<PropsWithChildren<castingData>> = ({people}) => {
    return(
        <div className={styles.personContainer}>
            {people.cast.map((person, i) => {
                return(
                        <div className={styles.PersonCard} key={i}>
                            <Image className={styles.personImage} src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.original_name} width={130} height={200} />
                            <p className={styles.personName}>{person.original_name}</p>
                            <p className={styles.personCharacter}>{person.character}</p>
                        </div>
                )
            })}
        </div>
    )
}

export default PeopleSection;