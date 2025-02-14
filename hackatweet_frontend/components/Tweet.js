import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "../styles/Hashtag.module.css";

function Tweet() {
    const user = useSelector((state) => state.user.value);

    let picture = (<img className={styles.profilePicture} src="profilepicture.png" alt = "profile picture"/>);

    return (
        <div className={styles.main}>
            {picture}
            <div>
                <h3>{user.firstname}</h3>
                <p className={styles.userName}>@{user.username} . </p>
            </div>

        </div>
    );
}

export default Tweet;