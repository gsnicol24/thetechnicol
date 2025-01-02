import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

function GameDetails(props: { selectedId: string }) {

    const [imageUrl, setImageUrl] = useState<string | undefined>("")
    const [gameName, setGameName] = useState<string | undefined>("")
    const [minPlayers, setMinPlayers] = useState<number>(1)
    const [maxPlayers, setMaxPlayers] = useState<number>(1)


    useEffect(() => {
        // if (props.selectedId !== "manual") {
        //     const baseUrl = "https://boardgamegeek.com/xmlapi2/thing?type=boardgame&id=" + props.selectedId

        //     axios.get(baseUrl)
        //         .then(response => {
        //             console.log(response);
        //         })
        //         .catch(error => {
        //             console.error(error)
        //         })
        // }
    });

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