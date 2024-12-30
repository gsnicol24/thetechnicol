import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseConfig from './firebase-config';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';



function Login() { 
    firebase.initializeApp(FirebaseConfig);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            { 
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, disableSignUp: {status: true, helpLink: undefined }
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

    if (isSignedIn) {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }

    return (
      <div className="App">
          <h1>You are signed in!</h1>
      </div>
    );
  }
  
  export default Login;