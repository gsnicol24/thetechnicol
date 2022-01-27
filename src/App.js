import NavigationBar from './navigation/nav-bar';
import BioPanel from './biography/bio-panel';
import SkillsPanel from './skills/skills-panel';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExperiencePanel from './experience/experience';
import IconCredits from './icon-credits/icon-credits';

import ReactGA from 'react-ga'

ReactGA.initialize('UA-301142432')
ReactGA.pageview("home")

function App() {
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
