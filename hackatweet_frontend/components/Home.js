import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { FaTrash } from "react-icons/fa";

function Home() {
    const [tweetText, setTweetText] = useState(""); // Stocker le texte du tweet en cours

    const [tweets, setTweets] = useState([
        { id: 1, author: "Antoine", username: "@AntoineLeProf", time: "5 hours", content: "Welcome to #hackatweet guys 😎", likes: 0, isMine: false },
        { id: 2, author: "Antoine", username: "@AntoineLeProf", time: "5 hours", content: "First! #hackatweet #first", likes: 1, isMine: false }
    ]);

    /* Ajouter un nouveau tweet */
    const handleTweet = () => {

        if (tweetText.trim() === "") return; // ne pas pouvoir ajouter un tweet vide

        const newTweet = {
            id: tweets.length + 1, 
            firstname: "You",
            username: "@You",
            time: "12h00",
            content: tweetText,
            likes: 0,
            isMine: true // Indique que ce tweet nous appartient (pouvoir le supp)
        };
        
        setTweets([newTweet, ...tweets]); // ajoute notre twweet en haut 
        setTweetText(""); // remet à vide le champ
    };

    /* Ajouter un like à un tweet */
    const handleLike = (id) => {
        setTweets(tweets.map(tweet => {
            if (tweet.id === id) {
                if (tweet.hasLiked) {
                    return { ...tweet, likes: tweet.likes - 1, hasLiked: false };
                } else {
                    return { ...tweet, likes: tweet.likes + 1, hasLiked: true };
                }
            }
            return tweet;
        }));
    };

    /* Supprimer un tweet */
    const handleDelete = (id) => {
        setTweets(tweets.filter(tweet => tweet.id !== id));
    };


    return (
        <div className={styles.home}>
            <div className={styles.home_container}>
                <h2>Home</h2>


                 {/* Zone de saisie d'un nouveau tweet */}
                <div>
                    <input className={styles.champ}
                        type="text"
                        placeholder="What's up?"  
                        value={tweetText} 
                        onChange={(e) => setTweetText(e.target.value)} 
                    />
                    <button className={styles.tweetbutton} onClick={handleTweet}>
                        Tweet
                    </button>
                </div>

                {/* Affichage des tweets */}
                <div className={styles.tweets}>
                    {tweets.map((tweet) => (
                        <div key={tweet.id} className={styles.tweet}>
                            <div className={styles.tweetHeader}>
                                <strong>{tweet.author}</strong> {tweet.username} · {tweet.time}


                                {/* Affiche la poubelle uniquement si c'est notre tweet */}
                                {tweet.isMine && (
                                    <FaTrash className={styles.poubelle} 
                                        onClick={() => handleDelete(tweet.id)} 
                                    />
                                )}
                            </div>

                            {/* Contenu du tweet */}
                            <p>{tweet.content}</p>

                             {/* liker le tweet */}
                            <span className={styles.likeButton} 
                                onClick={() => handleLike(tweet.id)} 
                                style={{ cursor: "pointer" }}
                            >
                                ❤️ {tweet.likes}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
