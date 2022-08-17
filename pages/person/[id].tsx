import {FC, PropsWithChildren} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {ExternalLinks, PersonCombinedCredits, PersonInformation, PersonMovieCredits, PersonTVCredits} from "../../interfaces";
import Image from "next/image";
import {Layout} from "../../layouts";
import Career from "../../components/Career";
import SidebarSocials from "../../components/SidebarSocials";
import styles from '../../styles/Person.module.css'

interface Props{
    personInformation: PersonInformation
    personCombinedCredits: PersonCombinedCredits
    personSocials: ExternalLinks
}

const Person:FC<PropsWithChildren<Props>> = ({personInformation, personCombinedCredits, personSocials}) => {
    return(
        <Layout title={personInformation.name} pageDescription={personInformation.biography}>
            <div className={styles.personContainer}>
                <div className={styles.profile}>
                    <div className={styles.profilePic}>
                        <Image src={`https://image.tmdb.org/t/p/h632${personInformation.profile_path}`} alt={personInformation.name} width={300} height={450}/>
                    </div>
                    <SidebarSocials socialData={personSocials}/>
                    <h2>Personal Info</h2>
                    <p className={styles.subtitle}>Known For</p>
                    <p className={styles.info}>{personInformation.known_for_department}</p>
                    <p className={styles.subtitle}>Birthday</p>
                    <p className={styles.info}>{personInformation.birthday}</p>
                    <p className={styles.subtitle}>Place of birth</p>
                    <p className={styles.info}>{personInformation.place_of_birth}</p>
                </div>
                <div className={styles.infoContainer}>
                    <h1>{personInformation.name}</h1>
                    <h3>Biography</h3>
                    <p>{personInformation.biography}</p>
                    <Career creditData={personCombinedCredits}/>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query})=>{
    const {data: personInformation} = await axios.get(`https://api.themoviedb.org/3/person/${query.id}?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    const {data: personCombinedCredits} = await axios.get(`https://api.themoviedb.org/3/person/${query.id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    const {data: personSocials} = await axios.get(`https://api.themoviedb.org/3/person/${query.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`)
    return {props:{
            personInformation,
            personCombinedCredits,
            personSocials
        }}
}

export default Person;