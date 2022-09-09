import {FC, PropsWithChildren} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Movie.module.css";

interface Props {
    social: string,
    id: string
}

const SocialIcon: FC<PropsWithChildren<Props>> = ({social, id}) => {
    return (
        <div className={styles.socialLink}>
            <Link href={`https://www.${social}.com/${id}`}>
                <a>
                    <Image src={`/${social}.png`} alt={`${social}-logo`} width={32} height={32}/>
                </a>
            </Link>
        </div>
    )
}

export default SocialIcon