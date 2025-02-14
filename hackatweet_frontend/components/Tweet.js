import { useSelector } from "react-redux";

import styles from "../styles/Tweet.module.css";

function Tweet(props) {
    //const user = useSelector((state) => state.user.value);

    let picture = (<img className={styles.profilePicture} src="profilepicture.png" alt = "profile picture"/>);

    return (
        <div className={styles.main}>
            <div className={styles.userInfo}>
                {picture}
                <div className = {styles.header}>
                    <h3>{props.firstname}</h3>
                    <p className={styles.userName}>@{props.username} . </p>
                </div>
            </div>
            <div className={styles.content}>
                <p>{props.content}</p>
            </div>

        </div>
    );
}

export default Tweet;