import axios, { AxiosResponse } from "axios";
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BGGSearchResult } from "../models/bgg-search-result";

function GameDetails(props: { selectedId: string }) {

    const [lastIdFetched, setLastIdFetched] = useState<string | undefined>(undefined)
    const [imageUrl, setImageUrl] = useState<string | undefined>("")
    const [gameName, setGameName] = useState<string | undefined>("")
    const [minPlayers, setMinPlayers] = useState<number>(1)
    const [maxPlayers, setMaxPlayers] = useState<number>(1)


    useEffect(() => {
        if (props.selectedId !== "manual" && lastIdFetched !== props.selectedId) {
            setLastIdFetched(props.selectedId)
            const baseUrl = "https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id=" + props.selectedId

            axios.get(baseUrl)
                .then(response => {
                    parseResults(response)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    });

    const parseResults = (response: AxiosResponse) => {
        const responseData = response.data;

        const options = {
            ignoreAttributes: false,
            attributeNamePrefix: '@_', // you have assign this so use this to access the attribute
        };
        const parser = new XMLParser(options)
        const parsedData = parser.parse(responseData)
        const item = parsedData.items.item

        const imgUrl = item.image;
        setImageUrl(imgUrl)

        const minPlayers = item.minplayers['@_value']
        const maxPlayers = item.maxplayers['@_value']
        setMinPlayers(minPlayers);
        setMaxPlayers(maxPlayers)

        const names = item.name;
        if (Array.isArray(names)) {
            for (let name of names) {
                var isPrimary = name['@_type'] === "primary";
                if (isPrimary) {
                    setGameName(name['@_value'])
                    break;
                }
            }
        } else {
            setGameName(names['@_value'])
        }
    }

    return (
        <div>
            <Form>


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
                                onChange={(e) => setGameName(e.target.value)}
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
                                onChange={(e) => setMinPlayers(e.target.value as unknown as number)}
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
                                onChange={(e) => setMaxPlayers(e.target.value as unknown as number)}
                                value={maxPlayers}
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
                                onChange={(e) => setImageUrl(e.target.value)}
                                value={imageUrl}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}

export default GameDetails