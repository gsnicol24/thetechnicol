import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import Modal from 'react-bootstrap/Modal';
import { XMLParser } from 'fast-xml-parser';
import { BGGSearchResult } from "../models/bgg-search-result";
import GameDetails from "./game-details";

function AddGameModal() {
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
    const [show, setShow] = useState(false);
    const [searchResults, setSearchResults] = useState<BGGSearchResult[]>([])


    const onAddManually = () => {
        setSelectedId(undefined)
        setSearchResults([])
        setValue(undefined)
        setSelectedId(selectedId !== undefined ? undefined : "manual")
    }

    const handleClose = () => {
        setShow(false)
        setSelectedId(undefined)
        setSearchResults([])
        setValue(undefined)
    };
    const handleShow = () => setShow(true);

    const [value, setValue] = useState(),
        onInput = (value: any) => setValue(value.target.value),
        onFormSubmit = (e: any) => {
            e.preventDefault()
            getInfo();
        }

    const getInfo = () => {
        const baseUrl = "https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=" + value

        axios.get(baseUrl)
            .then(response => {
                parseResults(response)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const parseResults = (response: AxiosResponse) => {
        const responseData = response.data;

        const options = {
            ignoreAttributes: false,
            attributeNamePrefix: '@_', // you have assign this so use this to access the attribute
        };
        const parser = new XMLParser(options)
        const parsedData = parser.parse(responseData)
        console.log(parsedData)
        const items = parsedData.items;

        const searchResults: BGGSearchResult[] = []
        items.item.forEach((item: any) => {
            const id = item['@_id'];
            const name = item.name['@_value'];
            const yearPublishedContainer = item.yearpublished;

            var yearPublished = undefined
            if (!!yearPublishedContainer) {
                yearPublished = yearPublishedContainer['@_value']
            }

            searchResults.push({
                id,
                name,
                yearPublished
            })
        })

        setSearchResults(searchResults)
    }

    const itemClicked = (id: string) => {
        setSelectedId(id)
    };


    return (
        <>
            <Button onClick={handleShow} style={{ display: "flex" }}>
                <PlusLg />
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add a game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        selectedId === undefined ?
                            <div>
                                <Form onSubmit={onFormSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search"
                                                className=" mr-sm-2"
                                                onChange={onInput}
                                                value={value}
                                            />
                                        </Col>
                                        <Col xs="2">
                                            <Button style={{ width: "100%" }} type="submit">Search</Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <ListGroup style={{ marginTop: 10 }}>
                                    {
                                        searchResults.map(result => {
                                            return (
                                                <ListGroup.Item action onClick={() => itemClicked(result.id)}>
                                                    {result.name}
                                                    <span style={{ float: "right" }}>{result.yearPublished}</span>
                                                </ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </div>
                            :
                            <div>
                                <GameDetails selectedId={selectedId} />
                            </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onAddManually}>
                        {selectedId === undefined ? "Add manually" : "Search for game"}
                    </Button>
                    <Button variant="primary" onClick={handleClose} disabled>
                        Add game
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddGameModal