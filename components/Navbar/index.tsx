import React from 'react';
import styles from '../../styles/Navbar.module.css'
import Link from "next/link";

function Index() {
    return (
        <div className={styles.navbar}>
            <ul className={styles.listItems}>
                <li><Link href={'/'}><a>Home</a></Link></li>
                <li><Link href={'/'}><a>Movies</a></Link></li>
                <li><Link href={'/'}><a>TV Shows</a></Link></li>
            </ul>
        </div>
    );
}

export default Index;