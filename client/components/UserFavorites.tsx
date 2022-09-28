import { useSelector } from "react-redux";
import { RootState } from "../store";

const UserFavorites = () => {
    const favoriteMedia = useSelector((state: RootState) => state.userFavorites.value)
    console.log(favoriteMedia);
    
    return (
        <div>
            
        </div>
    )
}



export default UserFavorites;