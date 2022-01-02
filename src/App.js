import NavigationBar from './navigation/nav-bar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BioColumnOne from './biography/bio-column-1'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="App-body">
        <Container>
          <Row>
            <Col>
              <BioColumnOne />
            </Col>
            <Col xs={8}>
              <h1>Biography</h1>
            </Col>
          </Row>
          <div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
