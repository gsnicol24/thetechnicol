import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import PanelHeader from '../shared/panel-header/panel-header'
import './experience.scss'

function ExperiencePanel() {
    return (
        <div class="experience-panel" id="experience">
            <Container>
                <PanelHeader title="Experience" />
                <Row>
                    <Col xs="12" sm="1"></Col>
                    <Col xs="12" sm="8">
                        <div class="experience-container">
                            <h5 class="title">Software Engineer</h5>
                            <h6>
                                <a href="https://rldatix.com">RLDatix</a>
                            </h6>
                            <h7>Feb 2020 - Present &middot; Charleston, SC</h7>
                            <div class="experience-details">
                                <ul>
                                    <li>Created and deployed new ASP.NET Core microservice and Angular front end to AWS to help
                                        facilitate the payer enrollment process.</li>
                                    <li>Architected and implemented an audit framework that tracks any changes made to database
                                        entities including before and after snapshots and the user that made the changes.</li>
                                    <li>Developed reusable custom Angular 12 components including phone/fax/email input
                                        components that formats the user input as they enter text, time picker component, and address
                                        input form component.</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="3"></Col>
                    <Col xs="12" sm="8">
                        <div class="experience-container">
                            <h5 class="title">Senior Software Engineer</h5>
                            <h6>
                                <a href="https://blackbaud.com">Blackbaud</a>
                            </h6>
                            <h7>Feb 2018 - Feb 2020 &middot; Charleston, SC</h7>
                            <div class="experience-details">
                                <ul>
                                    <li>Created a .NET Standard and Angular library that allows teams to easily view and manipulate
                                        production data in a Cosmos data while providing an audit trail and approval process.</li>
                                    <li>Worked closely with software architects to develop RESTful services in a microservice
                                        architecture to handle the event management domain which includes events, participants, and
                                        online registration forms.</li>
                                    <li>Implemented services that leveraged Azure Service Bus to asynchronously process request to
                                        identify unknown constituents and map them to known records.</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" sm="1"></Col>
                </Row>
                <Row>
                    <Col xs="12" sm="1"></Col>
                    <Col xs="12" sm="8">
                        <div class="experience-container">
                            <h5 class="title">Software Engineer II</h5>
                            <h6>
                                <a href="https://blackbaud.com">Blackbaud</a>
                            </h6>
                            <h7>Feb 2017 - Feb 2018 &middot; Charleston, SC</h7>
                            <div class="experience-details">
                                <ul>
                                    <li>Created self-contained system to act as the source of truth for all constituent records.</li>
                                    <li>Developed Angular library responsible for mapping clients to the correct zoned services which
                                        was necessary in order to upgrade from AngularJS to Angular 2+.</li>
                                    <li>Lead and mentored a team of interns tasked with determining the work necessary to upgrade
                                        legacy AngularJS applications to Angular 2.</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="3"></Col>
                    <Col xs="12" sm="8">
                        <div class="experience-container">
                            <h5 class="title">Software Engineer I</h5>
                            <h6>
                                <a href="https://blackbaud.com">Blackbaud</a>
                            </h6>
                            <h7>July 2015 - Feb 2017 &middot; Charleston, SC</h7>
                            <div class="experience-details">
                                <ul>
                                    <li>Reimplemented business logic in C# that was previously written in SQL in order to improve
                                        performance, maintainability, and test coverage.</li>
                                    <li>Created proof of concepts and delivered features specifically asked for by clients.</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" sm="1"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ExperiencePanel