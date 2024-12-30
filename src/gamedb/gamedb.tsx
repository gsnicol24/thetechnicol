
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactGA from 'react-ga4'
import { useEffect } from 'react';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseConfig from './firebase-config';
import Login from './login';

const app = initializeApp(FirebaseConfig);
const analytics = getAnalytics(app);

const TRACKING_ID = "UA-301142432"
function GameDB() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: "/gamedb", title: "GameDB" });
  }, [])

  return (
    <div className="App">
        <Login/>
    </div>
  );
}

export default GameDB;
