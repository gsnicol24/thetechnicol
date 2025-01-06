import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Filter, PlusLg } from "react-bootstrap-icons";
import FormRange from 'react-bootstrap/FormRange'

function FilterModal() {
    const ref = useRef<HTMLInputElement>(null);

    const thumbSize = 5
    const maxPlayers = 15;

    const [show, setShow] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(10)
    const [numberOfPlayersWidth, setNumberOfPlayersWidth] = useState(50)
    const [marginLeft, setMarginLeft] = useState(16)

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }
    const handleSave = () => {
        setShow(false);
    }

    const updateNumberOfPlayers = (num: number) => {
        setNumberOfPlayers(num);
        const fullWidth = ref?.current?.offsetWidth;
        if (fullWidth) {
            setMarginLeft(16 - 15 * (num / maxPlayers - (.3 * (num / maxPlayers))))
            const left = (((num - 1) / (maxPlayers - 1)) * ((fullWidth - thumbSize) - thumbSize)) + thumbSize;
            setNumberOfPlayersWidth(left)
        }
    }

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
                            <FormRange ref={ref} id="playerCount" min={1} max={maxPlayers} value={numberOfPlayers} onChange={e => updateNumberOfPlayers(e.target.valueAsNumber)} />
                            <span style={{ left: numberOfPlayersWidth, position: "absolute", marginLeft: marginLeft, marginTop: 20 }}>
                                {numberOfPlayers}
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