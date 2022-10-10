import useAuth from "../utils/useAuth";
import { SyntheticEvent } from "react";

const Account = () => {
    const {user} = useAuth()
    return (
        <div>
            <h2>{user.email}</h2>
            <form 
            onSubmit={(e: SyntheticEvent)=>{
                const target = e.target as typeof e.target & {
                    currentPassword: {value: string},
                    newPassword: {value: string}
                };
                const currentPassword = target.currentPassword.value;
                const newPassword = target.newPassword.value;
            }}
            >
                <label>Current Password:</label><br/>
                <input name={"currentPassword"} id={"currentPassword"} type={"text"}/><br/>
                <label>New Password:</label><br/>
                <input name={"newPassword"} id={"newPassword"} type={"text"}/><br/>
                <input type="submit" value={"Change Password"}/>
            </form>
            {/* //TODO: Change your password
                //TODO: Deactivate account
             */}
        </div>
    )
}

export default Account;