import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Filter, PlusLg } from "react-bootstrap-icons";
import FormRange from 'react-bootstrap/FormRange'

function FilterModal(props: { minPlaytime: number, maxPlaytime: number, updatePlayerCountFilter: (players: number) => void, updatePlaytimeFilter: (playtime: number) => void }) {
    const playersRef = useRef<HTMLInputElement>(null);
    const playtimeRef = useRef<HTMLInputElement>(null);

    const thumbSize = 5
    const maxPlayers = 15;

    const [show, setShow] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(10)
    const [playtime, setPlaytime] = useState(100)

    const [numberOfPlayersWidth, setNumberOfPlayersWidth] = useState(50)
    const [playersMarginLeft, setPlayersMarginLeft] = useState(16)

    const [playtimeWidth, setPlaytimeWidth] = useState(50)
    const [playtimeMarginLeft, setPlaytimeMarginLeft] = useState(16)

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }
    const handleSave = () => {
        props.updatePlayerCountFilter(numberOfPlayers)
        props.updatePlaytimeFilter(playtime)
        setShow(false);
    }

    const updateNumberOfPlayers = (num: number) => {
        setNumberOfPlayers(num);
    }

    const updatePlaytime = (num: number) => {
        setPlaytime(num);
    }

    useEffect(() => {
        const fullWidth = playtimeRef?.current?.offsetWidth;
        if (fullWidth) {
            setPlaytimeMarginLeft(16 - 15 * (playtime / props.maxPlaytime - (.3 * (playtime / props.maxPlaytime))))
            const left = (((playtime - props.minPlaytime) / (props.maxPlaytime - props.minPlaytime)) * ((fullWidth - thumbSize) - thumbSize)) + thumbSize;
            setPlaytimeWidth(left)
        }
    }, [playtime, props.maxPlaytime, props.minPlaytime])

    useEffect(() => {
        const fullWidth = playersRef?.current?.offsetWidth;
        if (fullWidth) {
            setPlayersMarginLeft(16 - 15 * (numberOfPlayers / maxPlayers - (.3 * (numberOfPlayers / maxPlayers))))
            const left = (((numberOfPlayers - 1) / (maxPlayers - 1)) * ((fullWidth - thumbSize) - thumbSize)) + thumbSize;
            setNumberOfPlayersWidth(left)
        }
    }, [numberOfPlayers])


    return (
        <>
            <Button onClick={handleShow} style={{ display: "flex", alignItems: "center" }} variant="outline-secondary">
                <Filter />
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Filter games</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="playerCount">Number of players</Form.Label>
                            <FormRange ref={playersRef} id="playerCount" min={1} max={maxPlayers} value={numberOfPlayers} onChange={e => updateNumberOfPlayers(e.target.valueAsNumber)} />
                            <span style={{ left: numberOfPlayersWidth, position: "absolute", marginLeft: playersMarginLeft, marginTop: 20 }}>
                                {numberOfPlayers}
                            </span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col>
                            <Form.Label htmlFor="playtime">Playtime</Form.Label>
                            <FormRange ref={playtimeRef} id="playtime" min={props.minPlaytime} max={props.maxPlaytime} value={playtime} onChange={e => updatePlaytime(e.target.valueAsNumber)} />
                            <span style={{ left: playtimeWidth, position: "absolute", marginLeft: playtimeMarginLeft, marginTop: 20 }}>
                                {playtime}
                            </span>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FilterModal