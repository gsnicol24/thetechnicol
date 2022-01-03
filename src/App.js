import NavigationBar from './navigation/nav-bar';
import BioPanel from './biography/bio-panel';
import SkillsPanel from './skills/skills-panel';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExperiencePanel from './experience/experience';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="App-body">
        <BioPanel />
        <SkillsPanel />
        <ExperiencePanel />
      </div>
    </div>
  );
}

export default App;
