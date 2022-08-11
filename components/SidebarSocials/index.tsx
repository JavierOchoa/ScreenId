import {FC, PropsWithChildren} from "react";
import {ExternalLinks} from "../../interfaces";
import styles from "../../styles/Movie.module.css";
import SocialIcon from "../SocialIcon/SocialIcon";

interface Props {
    socialData:  ExternalLinks
}

const SidebarSocials: FC<PropsWithChildren<Props>> = ({socialData}) => {
    return(
        <div className={styles.linksContainer}>
            {socialData.twitter_id &&
                <SocialIcon social={'twitter'} id={socialData.twitter_id}/>
            }
            {socialData.instagram_id &&
                <SocialIcon social={'instagram'} id={socialData.instagram_id}/>
            }
            {socialData.facebook_id &&
                <SocialIcon social={'facebook'} id={socialData.facebook_id}/>
            }
        </div>
    )
}

export default SidebarSocials;