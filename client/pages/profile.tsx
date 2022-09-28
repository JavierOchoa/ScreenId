import { GetServerSideProps } from "next";
import { Layout } from "../layouts";
import UserFavorites from "../components/UserFavorites";

const Profile = () => {
    return(
        <Layout title={"Profile"} pageDescription={"Users profile"}>
            <div>
                    <h1>Settings</h1>
                <div>
                    <p>My Favorites</p>
                    <p>Account</p>
                    <p>Deactivate Account</p>
                </div>
                <div>
                    <UserFavorites/>
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