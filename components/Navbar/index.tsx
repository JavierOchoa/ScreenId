import React from 'react';
import styles from './Navbar.module.css'

function Index() {
    return (
        <div className={styles.navbar}>
            <ul className={styles.listItems}>
                <li>Home</li>
                <li>Movies</li>
                <li>TV Shows</li>
            </ul>
        </div>
    );
}

export default Index;