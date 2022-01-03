import NavigationBar from './navigation/nav-bar';
import BioPanel from './biography/bio-panel';
import SkillsPanel from './skills/skills-panel';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="App-body">
        <BioPanel />
        <SkillsPanel />
      </div>
    </div>
  );
}

export default App;
