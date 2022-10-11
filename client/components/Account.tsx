import useAuth from "../utils/useAuth";
import { SyntheticEvent, useState } from "react";

const Account = () => {
    const {user, updatePassword} = useAuth();
    const [passwordUpdated, setPassowordUpdated] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('wWE')
    return (
        <div>
            <h2>{user.email}</h2>
            {passwordUpdated && <p>{confirmationMessage}</p>}
            <form 
            onSubmit={async(e: SyntheticEvent)=>{
                e.preventDefault();
                const target = e.target as typeof e.target & {
                    currentPassword: {value: string},
                    newPassword: {value: string}
                };
                const currentPassword = target.currentPassword.value;
                const newPassword = target.newPassword.value;
                const response = await updatePassword(currentPassword, newPassword);
                if(response?.successful) {
                    setPassowordUpdated(true)
                    setConfirmationMessage(response.message)
                } else {
                    console.log(response);
                }
            }}
            >
                <label>Current Password:</label><br/>
                <input name={"currentPassword"} id={"currentPassword"} type={"password"}/><br/>
                <label>New Password:</label><br/>
                <input name={"newPassword"} id={"newPassword"} type={"password"}/><br/>
                <input type="submit" value={"Change Password"}/>
            </form>
            {/* //TODO: Change your email
                //TODO: Deactivate account
             */}
        </div>
    )
}

export default Account;