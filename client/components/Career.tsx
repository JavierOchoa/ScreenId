import {FC, PropsWithChildren, useEffect, useState} from "react";
import {PersonCombinedCredits} from "../interfaces";
import styles from '../styles/Career.module.css'
import Link from "next/link";

interface Props {
    creditData: PersonCombinedCredits
}

const Career: FC<PropsWithChildren<Props>> = ({creditData}) =>{
    const personCreditData = creditData.cast.sort((a, b)=> Number(b.media_type==='movie'? b.release_date!.split("-")[0] : b.first_air_date!.split("-")[0]) - Number(a.media_type==='movie'? a.release_date?.split("-")[0] : a.first_air_date?.split("-")[0]))
    const years = personCreditData.map((credit)=>credit.media_type==='movie'?Number(credit.release_date?.split("-")[0]):Number(credit.first_air_date?.split("-")[0]))
    const careerYears = Array.from(new Set(years))
    const [yearsFilter, setYearsFilter] = useState('All');
    const [creditFilter, setCreditFilter] = useState(personCreditData)
    const handleYearChange=(selection:string)=>{
        setYearsFilter(selection)
        if(selection==='All') return setCreditFilter(personCreditData);
        const newCredits = personCreditData.filter((credit)=>(credit.media_type==='movie'?credit.release_date?.split("-")[0]:credit.first_air_date?.split("-")[0]) === selection)
        setCreditFilter(newCredits)
    }
    return(
        <div>
            <div className={styles.titlesContainer}>
                <h3>Career</h3>
                <div className={styles.yearSelection}>
                    <p>Select a year: </p>
                    <select className={styles.selectDropdown} value={yearsFilter} onChange={(e)=>(handleYearChange(e.target.value))}>
                        {yearsFilter === 'All' ? (<option value={'All'} disabled hidden>YEAR</option>) : (<option value={'All'}>--NO FILTER--</option>)}
                        {careerYears.map(year=> <option key={year} value={`${year}`}>{year}</option>)}
                    </select>
                </div>
            </div>
            {creditFilter.map((credit, i) => {
                return(
                    <div key={i} className={styles.creditInfoContainer}>
                        <p className={styles.secondaryText}>{credit.media_type==='movie' ? credit.release_date!.split("-")[0] : credit.first_air_date!.split("-")[0]}</p>
                        <Link href={credit.media_type==='movie'? `/movie/${credit.id}` : `/tv/${credit.id}`}>
                            <a>
                                <p className={styles.primaryText}>{credit.media_type==='movie' ? credit.title : credit.original_name}</p>
                            </a>
                        </Link>
                        {credit.character && <p className={styles.secondaryText}> {credit.character}</p>}
                    </div>
                )
            })}
        </div>
    )
}

export default Career;