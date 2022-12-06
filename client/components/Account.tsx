import useAuth from "../utils/useAuth";
import { SyntheticEvent, useState } from "react";
import styles from '../styles/Account.module.css';
import {useRouter} from "next/router";

const Account = () => {
    const {user, updatePassword, updateEmail, deleteAccount, logout} = useAuth();
    const [emailUpdated, setEmailUpdated] = useState(false)
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [disabledEmailForm, setDisabledEmailForm] = useState(true);
    const [disabledPasswordForm, setDisabledPasswordForm] = useState(true)
    const [confirmationMessage, setConfirmationMessage] = useState('')
    const [requestedDeactivation, setRequestedDeactivation] = useState(false);

    const router = useRouter();

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
            setPasswordUpdated(true)
            setConfirmationMessage(response.message)
            setDisabledPasswordForm(true)
        } else {
            console.log(response);
        }
    }

    const handleAccountDeletion = async(e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            currentPassword: {value: string},
        };
        const currentPassword = target.currentPassword.value;
        const response = await deleteAccount(currentPassword);
        if(response?.successful) {
            logout();
            router.reload();
        }
    }

    return (
        <div>
            {(passwordUpdated || emailUpdated) && <p className={styles.confirmationMessage}>{confirmationMessage}!</p>}
            <form onSubmit={(e: SyntheticEvent)=>handleUpdateEmailForm(e)} className={styles.form}>
                <label className={styles.formLabel}>{disabledEmailForm ? 'Email: ' : 'Current Email: '}</label>
                <a className={styles.updateEmailButton} onClick={() => setDisabledEmailForm(!disabledEmailForm)}>
                    {disabledEmailForm ? 'Update?' : 'Cancel'}
                </a><br/>
                <input name={"currentEmail"} id={"currentEmail"} value={user.email} type={"email"} disabled className={styles.input}/><br/>
                {!disabledEmailForm && <>
                    <label className={styles.formSecondLabel}>New Email:</label><br/>
                    <input name={"newEmail"} id={"newEmail"} type={"email"} className={styles.input}/><br/>
                    <label className={styles.formSecondLabel}>Current Password:</label><br/>
                    <input name={"currentPassword"} id={"currentPassword"} type={"password"} className={styles.input}/><br/>
                    <input type="submit" value={"Change Email"} className={styles.submitButton}/>
                </>}
            </form>
            <form onSubmit={(e: SyntheticEvent)=>handleUpdatePasswordForm(e)}>
                <label className={styles.formLabel}>{disabledPasswordForm ? 'Password: ' : 'Current Password: '}</label>
                <a className={styles.updateEmailButton} onClick={() => setDisabledPasswordForm(!disabledPasswordForm)}>
                    {disabledPasswordForm ? 'Update?' : 'Cancel'}
                </a><br/>
                {!disabledPasswordForm && <>
                    <input name={"currentPassword"} id={"currentPassword"} type={"password"} className={styles.input}/><br/>
                    <label className={styles.formSecondLabel}>New Password:</label><br/>
                    <input name={"newPassword"} id={"newPassword"} type={"password"} className={styles.input}/><br/>
                    <input type="submit" value={"Change Password"} className={styles.submitButton}/>
                </>
                }

            </form>
            <div className={styles.deactivateAccountContainer}>
                <button className={requestedDeactivation ? styles.hiddenMenu : styles.submitButton} onClick={()=>setRequestedDeactivation(!requestedDeactivation)}>
                    Deactivate Account
                </button>
                <div className={!requestedDeactivation ? styles.hiddenMenu : styles.deactivateAccountContainer}>
                    <p>ARE YOU SURE? THIS IS IRREVERSIBLE</p>
                    <form className={styles.deactivateAccountContainer} onSubmit={(e: SyntheticEvent)=>handleAccountDeletion(e)}>
                        <label className={styles.formSecondLabel}>Current Password:</label><br/>
                        <input name={"currentPassword"} id={"currentPassword"} type={"password"} className={styles.input}/><br/>
                        <input type="submit" value={"DELETE MY ACCOUNT"} className={styles.submitButton}/>
                        <p className={styles.updateEmailButton} onClick={()=>setRequestedDeactivation(!requestedDeactivation)}>CANCEL</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Account;