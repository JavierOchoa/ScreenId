import {useState} from 'react';
import styles from '../../styles/Navbar.module.css'
import Link from "next/link";
import useAuth from '../../utils/useAuth';
import AuthModal from '../authModal';

function Index() {
    const {login} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const {isAuthenticated, user} = useAuth();
    console.log(user);
    return (
        <div className={styles.navbar}>
            <p className={styles.logo}>Screen<span>Id</span></p>
            <ul className={styles.listItems}>
                <li><Link href={'/'}><a>Home</a></Link></li>
                <li><Link href={'/movies'}><a>Movies</a></Link></li>
                <li><Link href={'/shows'}><a>TV Shows</a></Link></li>
            </ul>
            {!isAuthenticated && 
            <div className={styles.auth}>
                {/* <Link href={'/login'}><a>Login</a></Link> */}
                <button onClick={()=>setShowModal(true)}>Login</button>
                <Link href={'/signup'}><a>SignUp</a></Link>
            </div>
            }

            <AuthModal onClose={()=>setShowModal(false)} show={showModal} type='login'/>
        </div>
    );
}

export default Index;