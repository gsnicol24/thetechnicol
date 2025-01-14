import { Modal, Row, Col, Form, Button, CardGroup, Alert } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import { Game } from "../models/game";
import MultiSelectDropdown from "../multi-select-dropdown/multi-select-dropdown";
import RandomGameCard from "./random-game-card";
import { useEffect, useRef, useState } from "react";
import './random-modal.scss'
import { Dice1, Dice1Fill, Dice2, Dice2Fill, Dice3, Dice3Fill, Dice4, Dice4Fill, Dice5, Dice5Fill, Dice6, Dice6Fill } from "react-bootstrap-icons";



function RandomModal(props: { show: boolean; games: Game[], handleClose: () => void }) {
    const [currentGameIdx, setCurrentGameIdx] = useState<number>(0)
    const [beforeCurrentGameIdx, setBeforeCurrentGameIdx] = useState<number>(0)
    const [afterCurrentGameIdx, setAfterCurrentGameIdx] = useState<number>(1)
    const [randomItemSelected, setRandomItemSelected] = useState<boolean>(false);

    var intervalId: NodeJS.Timeout;
    var shuffleIndex = 0;
    var shuffleCounter = 0;
    var randomIdx = 0;

    const intervalShuffle = () => {
        setCurrentGameIdx((shuffleIndex++) % props.games.length)
        shuffleCounter += 1;

        if (shuffleCounter >= randomIdx) {
            clearInterval(intervalId)
            setRandomItemSelected(true);
        } else if (shuffleCounter % 5) {
            clearInterval(intervalId)
            intervalId = setInterval(() => intervalShuffle(), 100 + (10 * Math.floor((shuffleCounter * (shuffleCounter / randomIdx)))))
        }
    }

    const shuffleGames = () => {
        randomIdx = 10 + Math.floor(Math.random() * 40)
        shuffleIndex = currentGameIdx;
        shuffleCounter = 0;
        setRandomItemSelected(false);
        intervalId = setInterval(() => intervalShuffle(), 100)
    }

    useEffect(() => {
        setBeforeCurrentGameIdx(currentGameIdx === 0 ? props.games?.length - 1 : (currentGameIdx - 1))
        setAfterCurrentGameIdx(currentGameIdx === props.games?.length - 1 ? 0 : (currentGameIdx + 1))
    }, [currentGameIdx, props])


    return (
        <Modal id="randomModal" show={props.show} onHide={props.handleClose} size="xl" style={{ height: "100vh" }}>
            <Modal.Header closeButton>
                <Modal.Title>Game randomizer</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '100%' }} >
                {
                    props.games && props.games.length > 0 &&
                    <Row>
                        <Col xs={3} style={{ alignContent: "center" }}>
                            <RandomGameCard game={props.games[beforeCurrentGameIdx]} isSelected={false} />
                        </Col>
                        <Col xs={6} style={{ alignContent: "center" }}>
                            <RandomGameCard game={props.games[currentGameIdx]} isSelected={true} />
                            {
                                randomItemSelected &&
                                (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Alert variant="success" style={{ marginTop: 16, padding: "4px 32px", display: "inline-block" }}>

                                            <div style={{ textAlign: "center" }}>
                                                <div >
                                                    <Dice1 /> <Dice2Fill /> <Dice3 /> <Dice4Fill /> <Dice5 /> <Dice6Fill />
                                                </div>
                                                <div>
                                                    {props.games[currentGameIdx].name}
                                                </div>
                                                <div>
                                                    <Dice1Fill /> <Dice2 /> <Dice3Fill /> <Dice4 /> <Dice5Fill /> <Dice6 />
                                                </div>
                                            </div>
                                        </Alert>
                                    </div>
                                )
                            }
                        </Col>
                        <Col xs={3} style={{ alignContent: "center" }}>
                            <RandomGameCard game={props.games[afterCurrentGameIdx]} isSelected={false} />
                        </Col>
                    </Row>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={shuffleGames}>
                    Shuffle
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default RandomModal