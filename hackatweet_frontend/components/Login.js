import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { login, logout } from "../reducers/user"

import { Modal } from 'antd';
import Head from 'next/head';
import styles from '../styles/Login.module.css';
import Header from "./Header";
import Home from "./Home";
import Hashtag from "./Hashtag";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const userToken = user.token;
  
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
  
  const showSignUpModal = () => {
		setSignUpModal(!signUpModal);
	};
  const showSignInModal = () => {
    setSignInModal(!signInModal);
  };

  const header = (<Header/>);
  let logo = (<img className={styles.logo} src="hackatweet_logo.png" alt = "logo"/>);

  const signUpButtonClicked = () => {
    fetch("http://localhost:3000/users/signup", {
      method : "POST",
      headers : { 'Content-Type': 'application/json'},
      body : JSON.stringify({username : signUpUsername, firstname : firstName,  password : signUpPassword}),
    }).then(response => response.json())
    .then(data => {
      if(data.result)
      {
        dispatch(login({username : data.userInfo.username, firstname : data.userInfo.firstname, token : data.userInfo.token}));
        showSignUpModal();
      }
    });
  };

  const signInButtonClicked = () =>{
    fetch("http://localhost:3000/users/signin", {
      method : "POST",
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify({username : signInUsername, password : signInPassword})
    }).then(response => response.json())
    .then(data => {
      console.log(data.result)
      if(data.result)
      {
        dispatch(login({username : data.userInfo.username, firstname : data.userInfo.firstname, token : data.token}));
        showSignInModal();
      }
    });
  }

  let signUpModalContent = (
    <div>
      <button className={styles.closeButton} onClick={() => showSignUpModal()}>X</button>
		  <div className={styles.signUpSection}>
        {logo}
				<p className={styles.text}>Create your Hackatweet account</p>
        <input type="text" placeholder="Firstname" id="signUpFirstname" className={styles.input} onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
				<input type="text" placeholder="Username" id="signUpUsername" className={styles.input} onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}/>
				<input type="password" placeholder="Password" id="signUpPassword" className={styles.input} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}/>
				<button id="register" onClick={() => signUpButtonClicked()}>Sign Up</button>
		  </div>
		</div>
  );

  let signInModalContent = (
    <div>
      <button className={styles.closeButton} onClick={() => showSignInModal()}>X</button>
      <div className={styles.signInSection}>
          <p className={styles.text}>Connect to Hackatweet</p>
          <input type="text" placeholder="Username" id="signInUsername" className={styles.input} onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
          <input type="password" placeholder="Password" id="signInPassword" className={styles.input} onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
            <button id="connection" onClick={() => signInButtonClicked()}>Sign In</button>
      </div>
    </div>
  );
  if(userToken)
  {
    router.push("/hashtag");
  }
  
  return (
    <div className={styles.main}>
      <Head>
        <title>Hackatweet</title>
      </Head>
      <div>
        <div className={styles.banner}>
          {header}
          <div className={styles.titleContainer}>
            {logo}
            <div className={styles.title}>
              <h1>See what's happening</h1>
              <h2>Join Hackatweet today.</h2>
            </div>
            <div className={styles.buttonsContainer}>
              <button onClick={() => showSignUpModal()}>Sign Up</button>
              <p className={styles.title}>Already have an account?</p>
              <button onClick={() => showSignInModal()}>Sign In</button>
              {signUpModal && <div className={styles.modals}>
                <Modal bodyStyle={{backgroundColor : "#141c27"}} open={signUpModal} closable={false} footer={null}>
                  {signUpModalContent}
                </Modal>
              </div>}
              {signInModal && <div className={styles.modals}>
                <Modal bodyStyle={{backgroundColor : "#141c27"}} open={signInModal} closable={false} footer={null}>
                  {signInModalContent}
                </Modal>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
