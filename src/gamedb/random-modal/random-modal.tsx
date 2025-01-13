import { Modal, Row, Col, Form, Button, CardGroup } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import { Game } from "../models/game";
import MultiSelectDropdown from "../multi-select-dropdown/multi-select-dropdown";
import RandomGameCard from "./random-game-card";
import { useEffect, useRef, useState } from "react";

function RandomModal(props: { show: boolean; games: Game[], handleClose: () => void }) {
    const [currentGameIdx, setCurrentGameIdx] = useState<number>(0)
    const [beforeCurrentGameIdx, setBeforeCurrentGameIdx] = useState<number>(0)
    const [afterCurrentGameIdx, setAfterCurrentGameIdx] = useState<number>(1)

    const shuffleGames = () => {
        setCurrentGameIdx(currentGameIdx !== props.games.length - 1 ? currentGameIdx + 1 : 0)
    }

    useEffect(() => {
        setBeforeCurrentGameIdx(currentGameIdx === 0 ? props.games?.length - 1 : (currentGameIdx - 1))
        setAfterCurrentGameIdx(currentGameIdx === props.games?.length - 1 ? 0 : (currentGameIdx + 1))
    }, [currentGameIdx, props])

    return (
        <Modal show={props.show} onHide={props.handleClose} size="xl" style={{ height: "100%" }}>
            <Modal.Header closeButton>
                <Modal.Title>Game randomizer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.games &&

                    <Row>
                        <Col xs={3} style={{ alignContent: "center" }}>
                            <RandomGameCard game={props.games[beforeCurrentGameIdx]} isSelected={false} />
                        </Col>
                        <Col xs={6} style={{ alignContent: "center" }}>
                            <RandomGameCard game={props.games[currentGameIdx]} isSelected={true} />
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