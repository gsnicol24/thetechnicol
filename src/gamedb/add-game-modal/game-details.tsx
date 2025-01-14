import axios, { Axios, AxiosResponse } from "axios";
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { BGGSearchResult } from "../models/bgg-search-result";
import React from "react";
import { X } from "react-bootstrap-icons";
import './game-details.scss'

function GameDetails(
    props: {
        selectedId: string
        setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
        setGameName: React.Dispatch<React.SetStateAction<string | undefined>>,
        setMinPlayers: React.Dispatch<React.SetStateAction<number>>,
        setMaxPlayers: React.Dispatch<React.SetStateAction<number>>,
        setMinPlaytime: React.Dispatch<React.SetStateAction<number>>,
        setMaxPlaytime: React.Dispatch<React.SetStateAction<number>>,
        setBestMinPlayers: React.Dispatch<React.SetStateAction<number>>,
        setBestMaxPlayers: React.Dispatch<React.SetStateAction<number>>,
        setGenres: React.Dispatch<React.SetStateAction<string[]>>
    }) {

    const [loading, setLoading] = useState<boolean>(true)
    const [lastIdFetched, setLastIdFetched] = useState<string | undefined>(undefined)
    const [imageUrl, setImageUrl] = useState<string | undefined>("")
    const [gameName, setGameName] = useState<string | undefined>("")
    const [minPlayers, setMinPlayers] = useState<number>(1)
    const [maxPlayers, setMaxPlayers] = useState<number>(1)
    const [minPlaytime, setMinPlaytime] = useState<number>(1)
    const [maxPlaytime, setMaxPlaytime] = useState<number>(1)
    const [bestMinPlayers, setBestMinPlayers] = useState<number>(1)
    const [bestMaxPlayers, setBestMaxPlayers] = useState<number>(1)
    const [newGenre, setNewGenre] = useState<string>("")
    const [genres, setGenres] = useState<string[]>([])


    useEffect(() => {
        if (props.selectedId === "manual") {
            setLoading(false);
        }

        if (props.selectedId !== "manual" && lastIdFetched !== props.selectedId) {
            setLastIdFetched(props.selectedId)
            // const baseUrl = "https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id=" + props.selectedId
            const baseUrl = "https://getgamedata-t6oajh64ha-uc.a.run.app?gameId=" + props.selectedId
            axios.get(baseUrl)
                .then(response => {
                    parseResultsV2(response)
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    });

    const parseResultsV2 = (response: AxiosResponse) => {
        const responseData = response.data;
        updateGameName(responseData.name)
        updateImageUrl(responseData.imageUrl)
        updateMinPlayers(responseData.minPlayers)
        updateMaxPlayers(responseData.maxPlayers)
        updateBestMinPlayers(responseData.bestMinPlayers)
        updateBestMaxPlayers(responseData.bestMaxPlayers)
        updateMinPlaytime(responseData.minPlaytime)
        updateMaxPlaytime(responseData.maxPlaytime)
        updateGenres(responseData.genres)
    }

    const updateGameName = (gameName: string) => {
        setGameName(gameName);
        props.setGameName(gameName)
    }

    const updateImageUrl = (imageUrl: string) => {
        setImageUrl(imageUrl);
        props.setImageUrl(imageUrl)
    }

    const updateMinPlayers = (number: number) => {
        setMinPlayers(number);
        props.setMinPlayers(number)
    }

    const updateMaxPlayers = (number: number) => {
        setMaxPlayers(number);
        props.setMaxPlayers(number)
    }

    const updateMinPlaytime = (number: number) => {
        setMinPlaytime(number);
        props.setMinPlaytime(number)
    }

    const updateMaxPlaytime = (number: number) => {
        setMaxPlaytime(number);
        props.setMaxPlaytime(number)
    }

    const updateBestMinPlayers = (number: number) => {
        setBestMinPlayers(number);
        props.setBestMinPlayers(number)
    }

    const updateBestMaxPlayers = (number: number) => {
        setBestMaxPlayers(number);
        props.setBestMaxPlayers(number)
    }

    const addNewGenre = () => {
        if (!!newGenre) {
            genres.push(newGenre);
            updateGenres(genres);
            setNewGenre("")
        }
    }

    const removeGenre = (genre: string) => {
        updateGenres(genres.filter(g => g !== genre))
    }

    const updateGenres = (genres: string[]) => {
        setGenres(genres);
        props.setGenres(genres);
    }

    return (
        <div>
            <Form>
                {loading ?
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Spinner animation="border" role="status" variant="primary" style={{ marginTop: 32, marginBottom: 32 }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div> :
                    <React.Fragment>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img
                                style={{ maxWidth: "50%" }}
                                src={imageUrl ? imageUrl : "question-mark.jpg"}
                                onError={({ currentTarget }) => {
                                    if (currentTarget.src != "question-mark.jpg") {
                                        currentTarget.src = "question-mark.jpg";
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="gameName">Game Name</Form.Label>
                                    <Form.Control
                                        id="gameName"
                                        type="text"
                                        className=" mr-sm-2"
                                        onChange={(e) => updateGameName(e.target.value)}
                                        value={gameName}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="minPlayers">Min Players</Form.Label>
                                    <Form.Control
                                        id="minPlayers"
                                        type="number"
                                        min={1}
                                        className=" mr-sm-2"
                                        onChange={(e) => updateMinPlayers(Number(e.target.value))}
                                        value={minPlayers}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="maxPlayers">Max Players</Form.Label>
                                    <Form.Control
                                        id="maxPlayers"
                                        type="number"
                                        min={1}
                                        className=" mr-sm-2"
                                        onChange={(e) => updateMaxPlayers(Number(e.target.value))}
                                        value={maxPlayers}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="bestMinPlayers">Best With Min Players</Form.Label>
                                    <Form.Control
                                        id="bestMinPlayers"
                                        type="number"
                                        min={1}
                                        className=" mr-sm-2"
                                        onChange={(e) => updateBestMinPlayers(Number(e.target.value))}
                                        value={bestMinPlayers}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="maxPlayers">Best With Max Players</Form.Label>
                                    <Form.Control
                                        id="bestMaxPlayers"
                                        type="number"
                                        min={1}
                                        className=" mr-sm-2"
                                        onChange={(e) => updateBestMaxPlayers(Number(e.target.value))}
                                        value={bestMaxPlayers}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="minPlaytime">Min Playtime</Form.Label>
                                    <Form.Control
                                        id="minPlaytime"
                                        type="number"
                                        min={1}
                                        className=" mr-sm-2"
                                        onChange={(e) => updateMinPlaytime(Number(e.target.value))}
                                        value={minPlaytime}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="maxPlaytime">Max Playtime</Form.Label>
                                    <Form.Control
                                        id="maxPlaytime"
                                        type="number"
                                        min={1}
                                        className=" mr-sm-2"
                                        onChange={(e) => updateMaxPlaytime(Number(e.target.value))}
                                        value={maxPlaytime}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="gameImgSrc">Game Image URL</Form.Label>
                                    <Form.Control
                                        id="gameImgSrc"
                                        type="text"
                                        className=" mr-sm-2"
                                        onChange={(e) => updateImageUrl(e.target.value)}
                                        value={imageUrl}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="newGenre">Genres</Form.Label>
                                    <Form.Control
                                        id="newGenre"
                                        type="text"
                                        className=" mr-sm-2"
                                        onChange={(e) => setNewGenre(e.target.value)}
                                        value={newGenre}
                                    />
                                </Col>
                                <Col xs={6} md={4} lg={3} style={{ alignContent: "end" }}>
                                    <Button style={{ width: "100%" }} onClick={addNewGenre}>
                                        Add new genre
                                    </Button>
                                </Col>
                            </Row>
                            <div style={{ display: "flex", marginTop: 16 }}>
                                {
                                    genres.map((genre, idx) => {
                                        return (
                                            <span className="genre" key={idx}>
                                                {genre}
                                                <Button variant="outline-danger" style={{ display: "inline-flex", marginLeft: 8 }} onClick={() => removeGenre(genre)}>
                                                    <X />
                                                </Button>
                                            </span>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </React.Fragment>

                }
            </Form>

        </div >
    )
}

export default GameDetails