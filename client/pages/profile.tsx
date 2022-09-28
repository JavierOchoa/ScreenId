import { GetServerSideProps } from "next";
import { Layout } from "../layouts";

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
                    {/* TODO: SETTING BOX with switch*/}
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