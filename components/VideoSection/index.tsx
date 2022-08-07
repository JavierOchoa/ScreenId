import {FC, PropsWithChildren} from "react";
import ReactPlayer from "react-player/youtube";
import styles from '../../styles/VideoSection.module.css'
import {MovieVideos} from "../../interfaces";

interface Props{
    videoData: MovieVideos;
}

const VideoSection:FC<PropsWithChildren<Props>> = ({videoData}) => {
    return(
        <div className={styles.videoContainer}>
            {
                videoData.results.reverse().map((video, i) => {
                    return(
                        <div key={i} className={styles.videoCard}>
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VideoSection;