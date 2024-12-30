
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactGA from 'react-ga4'
import { useEffect, useState } from 'react';
import './gamedb.scss'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseConfig from './firebase-config';
import 'firebase/compat/auth';
import GameDBToolbar from './toolbar/toolbar';
import GameDBList from './gamedb-list';

const app = initializeApp(FirebaseConfig);
const analytics = getAnalytics(app);

const TRACKING_ID = "UA-301142432"
function GameDB() {
    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.send({ hitType: "pageview", page: "/gamedb", title: "GameDB" });
    }, [])

    firebase.initializeApp(FirebaseConfig);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, disableSignUp: { status: true, helpLink: undefined }
            }
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },

    };


    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div className="login-container">
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }

    return (
        <div className="App">
            <GameDBToolbar />
            <GameDBList />
        </div>
    );
}

export default GameDB;
