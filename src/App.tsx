import NavigationBar from './navigation/nav-bar';
import BioPanel from './biography/bio-panel';
import SkillsPanel from './skills/skills-panel';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExperiencePanel from './experience/experience';
import IconCredits from './icon-credits/icon-credits';

import ReactGA from 'react-ga4'
import { useEffect } from 'react';
import React from 'react';

const TRACKING_ID = "UA-301142432"
function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/home", title: "Home" });
  }, [])

  return (
    <div className="App">
      <NavigationBar />
      <div className="App-body">
        <BioPanel />
        <SkillsPanel />
        <ExperiencePanel />
        <IconCredits />
      </div>
    </div>
  );
}

export default App;
