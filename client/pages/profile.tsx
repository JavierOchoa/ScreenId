import { useRouter } from "next/router";
import { Layout } from "../layouts";
import styles from '../styles/Profile.module.css';
import { useState } from "react";
import ProfileContent from "../components/ProfileContent";
import useAuth from "../utils/useAuth";

const Profile = () => {
    const [toRender, setToRender] = useState('favorites');
    const {user, isLoading, isAuthenticated} = useAuth();
    const router = useRouter()

    const handleToRender = (contentToRender: string) => {
        setToRender(contentToRender);
    }

    if(isLoading) return <></>

    if(!isLoading && !isAuthenticated) router.push('/')

    if(isAuthenticated) {
        return(
            <Layout title={"Profile"} pageDescription={"Users profile"}> 
                <div className={styles.container}>
                        <h1>Hi, {user.fullName}</h1>
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
}

export default Profile;