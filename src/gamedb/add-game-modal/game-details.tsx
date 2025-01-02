import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

function GameDetails(props: { selectedId: string }) {

    const [imageUrl, setImageUrl] = useState<string | undefined>("")


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

                <Container fluid>
                    <Row>
                        <Col>
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
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    value={imageUrl}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    )
}

export default GameDetails