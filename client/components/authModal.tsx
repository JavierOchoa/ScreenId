import styles from '../styles/authModal.module.css'
import { FC, PropsWithChildren } from 'react';
import useAuth from '../utils/useAuth';

interface Props {
    show: boolean;
    type: 'login' | 'signup' | 'content';
    onClose?: () => void;
}

const AuthModal: FC<PropsWithChildren<Props>> = ({show, type, onClose, children}) => {
    const {login} = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        login(email, password);
        // console.log(email, password);
    }
    
    if(!show) return null;

    return(
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Modal Title</h4>
                </div>
                <div className={styles.modalBody}>
                    {(type === 'login' || type === 'signup') &&
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            {type ==='signup' &&
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" />
                                </div>
                            }

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" />
                            </div>
                            <div className={styles.formGroup}>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    }
                    {type === 'content' && children}
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AuthModal;