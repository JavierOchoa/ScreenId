import styles from '../styles/Footer.module.css';
import Link from "next/link";

const Footer = () => {
    return(
        <div className={styles.footContainer}>
            <p>made with ❤️ by <Link href={'https://github.com/JavierOchoa'}><a>Javier Ochoa</a></Link></p>
        </div>
    )
}

export default Footer;