import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { logout } from "../reducers/user"

import styles from "../styles/Hashtag.module.css";

function Hashtag() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    
    const [searchedHashtag, setSearchedHashtag] = useState("");
    
    let logo = (<img className={styles.logo} src="hackatweet_logo.png" alt = "logo"/>);
    let picture = (<img className={styles.profilePicture} src="profilepicture.png" alt = "profile picture"/>);

    let trendingTweet1 = (
    <div>
        <h3>#hackatweet</h3>
        <p>2k Tweets</p>
    </div>
    );
    let trendingTweet2 = (
        <div>
            <h3>#trouts</h3>
            <p>1k Tweets</p>
        </div>
    );
    let trendingTweet3 = (
        <div>
            <h3>#cookiedough</h3>
            <p>543 Tweets</p>
        </div>
    );

    const homeButtonClicked = () =>{
        router.push("/home");
    };
    const logoutButtonClicked = ()=>{
        dispatch(logout());
        router.push("/");
    };
    
    return (
    <div className={styles.main}>
        <button className = {styles.homeButton} onClick={() => homeButtonClicked()}>
            {logo}
        </button>
        <div className={styles.homeContainer}>
            <div className={styles.user}>
                {picture}
                <div className={styles.userInfos}>
                    <p>{user.firstname}</p>
                    <p className={styles.userName}>@{user.username}</p>
                </div>
            </div>
            <button className={styles.logoutButton} onClick={() => logoutButtonClicked()}>
                Log out
            </button>
        </div>
        <div className={styles.tweetContainer}>
            <h2 className={styles.hashtagTitle}>Hashtag</h2>
            <input type = "text" placeholder="#hackatweet" className={styles.searchbar} onChange={(e) => setSearchedHashtag(e.target.value)} value={searchedHashtag}/>
        </div>
        <div className={styles.trendContainer}>
            <h2>Trends</h2>
            <div className={styles.trends}>
                {trendingTweet1}
                {trendingTweet2}
                {trendingTweet3}
            </div>
        </div>

    </div>
    );
}

export default Hashtag;