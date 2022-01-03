import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PanelHeader from '../../shared/panel-header/panel-header';
import './bio-column-2.scss'

function BioColumnTwo() {
    return (
        <div class="bio-column-2">
            <PanelHeader title="About Me" />
            <div class="about-me-container">
                <p>
                    Hi, I'm Gavin, a full stack software engineer based out of Charleston, SC.
                    I have a computer science degree from North Carolina State University and am currently working at RLDatix.
                </p>
                <p>
                    While I am a full stack engineer, I really enjoy working on frontend projects and learning more about frameworks and libraries like Angular or React.
                    To me, there is nothing more satisfying than creating well designed UI components that users will enjoy.
                </p>

                <div class="interests-and-education">
                    <Row>
                        <Col xs="12" sm="4">
                            <h5>Interests</h5>
                            <ul>
                                <li>
                                    Software engineering
                                </li>
                                <li>
                                    3D Printing
                                </li>
                                <li>
                                    Exercising
                                </li>
                                <li>
                                    Dogs (especially Golden Retrievers!)
                                </li>
                            </ul>
                        </Col>
                        <Col xs="12" sm="8">
                            <h5>Education</h5>
                            <ul class="education-list">
                                <li>
                                    <div class="education-entry">
                                        <img src="icons/education.png"/>
                                        <div>
                                            <div class="education-title">Bachelor in Computer Science</div>
                                            <div class="education-detail">North Carolina State University &middot; 2015</div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="education-entry">
                                        <img src="icons/education.png"/>
                                        <div>
                                            <div class="education-title">Associate of Science</div>
                                            <div class="education-detail">Forsyth Technical Community College &middot; 2012</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default BioColumnTwo;