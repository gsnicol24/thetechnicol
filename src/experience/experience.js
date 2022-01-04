import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import PanelHeader from '../shared/panel-header/panel-header'
import './experience.scss'
import React, { useState, useEffect } from 'react';

function ExperiencePanel() {
    const [data, setData] = useState([]);

    const getData = () => {
        fetch('experience.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setData(myJson)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="experience-panel" id="experience">
            <Container>
                <PanelHeader title="Experience" />
                {
                    data.map((item, index) => {
                        return <Row key={item.id}>
                            <Col xs="12" sm={index % 2 == 0 ? 1: 3}></Col>
                            <Col xs="12" sm="8">
                                <div className="experience-container">
                                    <h5 className="title">{item.position}</h5>
                                    <h6>
                                        <a href={item.href}>{item.employer}</a>
                                    </h6>
                                    <span>{item.duration} &middot; {item.location}</span>
                                    <div className="experience-details">
                                        <ul>
                                            {
                                                item.bulletpoints.map((bp, index) => {
                                                    return <li key={index}>{bp}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    })
                }
            </Container>
        </div>
    )
}

export default ExperiencePanel