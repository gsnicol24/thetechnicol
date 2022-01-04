import { Col, Container, Row } from 'react-bootstrap';
import PanelHeader from '../shared/panel-header/panel-header';
import Skill from './skill/skill';
import './skills-panel.scss';

function SkillsPanel() {
    return (
        <div className="skills-panel" id="skills">
            <Container>
                <div className="header-container">
                    <PanelHeader title="Skills"/>
                </div>
                <Row>
                    <Col xs="12" sm="4">
                        <Skill icon="skills/csharp.png" title=".NET" details="ASP.NET Core, C#, Visual Basic"/>
                    </Col>
                    <Col xs="12" sm="4">
                        <Skill icon="skills/angular.png" title="Angular" details="AngularJS and Angular 2+"/>
                    </Col>
                    <Col xs="12" sm="4">
                        <Skill icon="skills/android.png" title="Android" details="Android Studio, Kotlin, Java"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="6">
                        <Skill icon="skills/cloud.png" title="Cloud" details="Microsoft Azure and Amazon Web Services"/>
                    </Col>
                    <Col xs="12" sm="6">
                        <Skill icon="skills/databases.png" title="Databases" details="MSSQL, Cosmos, PostgreSQL"/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SkillsPanel;