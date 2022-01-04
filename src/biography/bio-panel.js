
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BioColumnOne from './columns/bio-column-1'
import BioColumnTwo from './columns/bio-column-2'

import './bio-panel.scss'

function BioPanel() {
    return (
        <div className="bio-panel" id="home">
            <Container>
                <Row>
                    <Col>
                        <BioColumnOne />
                    </Col>
                    <Col xs="12" sm="8">
                        <BioColumnTwo />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BioPanel