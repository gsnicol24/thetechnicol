import { Col, Container, Row } from 'react-bootstrap';
import PanelHeader from '../shared/panel-header/panel-header';
import Skill from './skill/skill';
import './skills-panel.scss';

function SkillsPanel() {
    return (
        <div class="skills-panel">
            <Container>
                <div class="header-container">
                    <PanelHeader title="Skills"/>
                </div>
                <Row>
                    <Col>
                        <Skill icon="skills/csharp.png" title=".NET" details="ASP.NET Core, C#, Visual Basic"/>
                    </Col>
                    <Col>
                        <Skill icon="skills/angular.png" title="Angular" details="ASP.NET Core, C#, Visual Basic"/>
                    </Col>
                    <Col>
                        <Skill icon="skills/android.png" title="Android" details="ASP.NET Core, C#, Visual Basic"/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SkillsPanel;