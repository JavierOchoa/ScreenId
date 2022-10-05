import { GetServerSideProps } from "next";
import { Layout } from "../layouts";
import UserFavorites from "../components/UserFavorites";
import styles from '../styles/Profile.module.css';

const Profile = () => {
    return(
        <Layout title={"Profile"} pageDescription={"Users profile"}>
            <div className={styles.container}>
                    <h1>Settings</h1>
                <div className={styles.sectionsContent}>
                    <div className={styles.sections}>
                        <p className={styles.sectionName}>My Favorites</p>
                        <p className={styles.sectionName}>Account</p>
                        <p className={styles.sectionName}>Deactivate Account</p>
                    </div>
                    <div className={styles.content}>
                        <UserFavorites/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {

    return{
        props:{
            agua: 's'
        }
    }
}

export default Profile;