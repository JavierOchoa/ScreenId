import styles from '../styles/authModal.module.css'
import { FC, PropsWithChildren, useState, FormEvent } from 'react';
import useAuth from '../utils/useAuth';

interface Props {
    show: boolean;
    type: 'login' | 'signup' | 'content';
    onClose?: () => void;
}

const AuthModal: FC<PropsWithChildren<Props>> = ({show, type, onClose, children}) => {
    const {login, signup, errorMessage} = useAuth();
    const [formType, setFormType] = useState(type);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const fullName = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        if(formType === 'login'){
            await login(email, password);
        }
        if(formType === 'signup'){
            await signup(fullName, email, password, confirmPassword);
        }
    }
    
    if(!show) return null;

    return(
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>{formType}</h4>
                </div>
                <div className={styles.modalBody}>
                    {(type === 'login' || type === 'signup') &&
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            {formType ==='signup' &&
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" id="name" />
                                </div>
                            }

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email: </label>
                                <input type="email" name="email" id="email" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" id="password" />
                            </div>
                            {formType === 'signup' &&
                                <div className={styles.formGroup}>
                                    <label htmlFor="confirmPassword">Confirm Password: </label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" />
                                </div>
                            }
                            {formType === 'login' &&
                                <p className={styles.authType} onClick={()=>setFormType('signup')}>Don&apos;t have an account yet?</p>
                            }
                            {formType === 'signup' &&
                                <p className={styles.authType} onClick={()=>setFormType('login')}>Already have an account?</p>
                            }
                            <div className={styles.formGroup}>
                                <button className={styles.button} type="submit">{formType === 'login' ? 'Login' : 'Signup'}</button>
                            </div>
                            <p className={styles.errorMessage}>{errorMessage}</p>
                        </form>
                    }
                    {formType === 'content' && children}
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.button} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AuthModal;