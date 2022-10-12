import useAuth from "../utils/useAuth";
import { SyntheticEvent, useState } from "react";
import styles from '../styles/Account.module.css';

const Account = () => {
    const {user, updatePassword, updateEmail} = useAuth();
    const [emailUpdated, setEmailUpdated] = useState(false)
    const [passwordUpdated, setPassowordUpdated] = useState(false);
    const [disabledEmailForm, setDisabledEmailForm] = useState(true);
    const [disabledPasswordForm, setDisabledPasswordForm] = useState(true)
    const [confirmationMessage, setConfirmationMessage] = useState('')

    const handleUpdateEmailForm = async(e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            newEmail: {value: string},
            currentPassword: {value: string}
        };
        const newEmail = target.newEmail.value;
        const currentPassword = target.currentPassword.value;
        const response = await updateEmail(currentPassword, newEmail);
        if(response?.successful){
            setEmailUpdated(true);
            setDisabledEmailForm(true)
            setConfirmationMessage(response.message)
        }
    }

    const handleUpdatePasswordForm = async(e: SyntheticEvent) => {
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
    }

    return (
        <div>
            <h2>Account Details</h2>

            {(passwordUpdated || emailUpdated) && <p>{confirmationMessage}</p>}
            <form onSubmit={(e: SyntheticEvent)=>handleUpdateEmailForm(e)}>
                <label>Email:</label><br/>
                <input name={"currentEmail"} id={"currentEmail"} value={user.email} type={"email"} disabled/> <a className={styles.updateEmailButton} onClick={() => setDisabledEmailForm(!disabledEmailForm)}>{disabledEmailForm ? 'Update?' : 'Cancel'}</a><br/>
                {!disabledEmailForm && <>
                    <label>New Email:</label><br/>
                    <input name={"newEmail"} id={"newEmail"} type={"email"}/><br/>
                    <label>Current Password:</label><br/>
                    <input name={"currentPassword"} id={"currentPassword"} type={"password"}/><br/>
                    <input type="submit" value={"Change Email"}/>
                </>}
            </form>
            <form onSubmit={(e: SyntheticEvent)=>handleUpdatePasswordForm(e)}>
                <label>{disabledPasswordForm ? 'Password: ' : 'Current Password: '}</label><a className={styles.updateEmailButton} onClick={() => setDisabledPasswordForm(!disabledPasswordForm)}>{disabledPasswordForm ? 'Update?' : 'Cancel'}</a><br/>
                {!disabledPasswordForm && <>
                    <input name={"currentPassword"} id={"currentPassword"} type={"password"}/><br/>
                    <label>New Password:</label><br/>
                    <input name={"newPassword"} id={"newPassword"} type={"password"}/><br/>
                    <input type="submit" value={"Change Password"}/>
                </>
                }

            </form>
            {/* //TODO: Change your email
                //TODO: Deactivate account
             */}
        </div>
    )
}

export default Account;