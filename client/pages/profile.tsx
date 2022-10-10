import { GetServerSideProps } from "next";
import { Layout } from "../layouts";
import styles from '../styles/Profile.module.css';
import { useState } from "react";
import ProfileContent from "../components/ProfileContent";

const Profile = () => {
    const [toRender, setToRender] = useState('favorites')

    const handleToRender = (contentToRender: string) => {
        setToRender(contentToRender);
    }

    return(
        <Layout title={"Profile"} pageDescription={"Users profile"}> 
            <div className={styles.container}>
                    <h1>Settings</h1>
                <div className={styles.sectionsContent}>
                    <div className={styles.sections}>
                        <p className={styles.sectionName} onClick={()=>handleToRender('favorites')}>My Favorites</p>
                        <p className={styles.sectionName} onClick={()=>handleToRender('account')}>Account</p>
                    </div>
                    <div className={styles.content}>
                        <ProfileContent content={toRender}/>
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