import UserFavorites from "./UserFavorites";
import {FC, PropsWithChildren} from 'react'
import Account from "./Account";

interface Props {
    content: string;
}

const ProfileContent: FC<PropsWithChildren<Props>> = ({content}) => {
    switch(content) {
        case 'favorites':
            return (
                <UserFavorites/>
            )
            break;
        case 'account':
            return (
                <Account/>
            )
            break;
    }
    return (<></>)

}

export default ProfileContent;