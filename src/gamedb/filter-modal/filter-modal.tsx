import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Filter, PlusLg } from "react-bootstrap-icons";
import FormRange from 'react-bootstrap/FormRange'
import MultiSelectDropdown from "../multi-select-dropdown/multi-select-dropdown";
import { FilterQuery } from "../models/filter";

function FilterModal(props: {
    minPlaytime: number,
    maxPlaytime: number,
    genres: string[],
    updatePlayerCountFilter: (players: number | undefined) => void,
    updatePlaytimeFilter: (playtime: number | undefined) => void,
    updateGenres: (genres: string[] | undefined) => void,
    updateFilter: (query: Partial<FilterQuery>) => void
}) {
    const [filterOnPlayers, setFilterOnPlayers] = useState(false)
    const [filterOnPlaytime, setFilterOnPlaytime] = useState(false)

    const playersRef = useRef<HTMLInputElement>(null);
    const playtimeRef = useRef<HTMLInputElement>(null);

    const thumbSize = 5
    const maxPlayers = 15;

    const [show, setShow] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(10)
    const [playtime, setPlaytime] = useState(100)
    const [selectedGenres, setSelectedGenres] = useState<string[] | undefined>([]);

    const [numberOfPlayersWidth, setNumberOfPlayersWidth] = useState(50)
    const [playersMarginLeft, setPlayersMarginLeft] = useState(16)

    const [playtimeWidth, setPlaytimeWidth] = useState(50)
    const [playtimeMarginLeft, setPlaytimeMarginLeft] = useState(16)

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }
    const handleSave = () => {
        const filterQuery: Partial<FilterQuery> = {
            players: filterOnPlayers ? numberOfPlayers : undefined,
            playtime: filterOnPlaytime ? playtime : undefined,
            genres: []
        }

        props.updatePlayerCountFilter(filterOnPlayers ? numberOfPlayers : undefined)
        props.updatePlaytimeFilter(filterOnPlaytime ? playtime : undefined)

        if (!!selectedGenres && selectedGenres.length > 0) {
            filterQuery.genres = selectedGenres
        }

        props.updateFilter(filterQuery)

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
                            <Form.Check id="filterOnPlayers" label="Filter on players?" checked={filterOnPlayers} onChange={e => setFilterOnPlayers(e.target.checked)} />
                            <div>
                                <Form.Label htmlFor="playerCount">Number of players</Form.Label>
                                <FormRange
                                    ref={playersRef}
                                    id="playerCount"
                                    min={1}
                                    max={maxPlayers}
                                    disabled={!filterOnPlayers}
                                    value={numberOfPlayers}
                                    onChange={e => updateNumberOfPlayers(e.target.valueAsNumber)} />
                                <span style={{ left: numberOfPlayersWidth, position: "absolute", marginLeft: playersMarginLeft, marginTop: 20 }}>
                                    {numberOfPlayers}
                                </span>

                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col>

                            <Form.Check id="filterOnPlaytime" label="Filter on playtime?" checked={filterOnPlaytime} onChange={e => setFilterOnPlaytime(e.target.checked)} />
                            <div>
                                <Form.Label htmlFor="playtime">Playtime</Form.Label>
                                <FormRange disabled={!filterOnPlaytime} ref={playtimeRef} id="playtime" min={props.minPlaytime} max={props.maxPlaytime} value={playtime} onChange={e => updatePlaytime(e.target.valueAsNumber)} />
                                <span style={{ left: playtimeWidth, position: "absolute", marginLeft: playtimeMarginLeft, marginTop: 20 }}>
                                    {playtime}
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ marginTop: 32 }}>
                                <MultiSelectDropdown genres={props.genres} setSelectedOptions={setSelectedGenres} />
                            </div>
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
            </Modal >
        </>
    );
}

export default FilterModal