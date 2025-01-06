
import { initializeApp } from "firebase/app";
import { QuerySnapshot, getFirestore, onSnapshot } from "firebase/firestore";
import FirebaseConfig from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Game } from "./models/game"
import Card from 'react-bootstrap/Card';
import { Clock, List, MenuApp, MenuButton, People, Star, StarFill } from "react-bootstrap-icons";
import { Button, CardGroup, Col, Container, Dropdown, Row } from "react-bootstrap";
import React from "react";
import './gamedb-list.scss'
import DeleteGameModal from "./delete-game-modal/delete-game-modal";

function GameDBList(props: { searchText: string | undefined }) {
    const [games, setGames] = useState<Game[]>()
    // Initialize Firebase
    const app = initializeApp(FirebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "games"), snapshot => {
            var gameDocs = snapshot.docs
                .map(doc => {
                    const docData = doc.data();
                    const game = docData as Game;
                    game.id = doc.id;
                    return game;
                })
                .sort((a, b) => a.name.localeCompare(b.name))

            if (!!props.searchText) {
                gameDocs = gameDocs.filter(gameDoc => gameDoc.name.toUpperCase().indexOf(props.searchText!.toUpperCase()) > -1)
            }
            setGames(gameDocs)
        });
    })



    return (
        <Container style={{ marginTop: 100 }}>
            <Row>
                <CardGroup>
                    {
                        games?.map((game) => {
                            return (
                                <Col key={game.id} xs={12} sm={6} lg={4} xl={3}>
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                        <Card style={{ minWidth: "90%", maxWidth: "90%" }}>
                                            <Card.Img variant="top" src={game.img ?? "question-mark.jpg"} style={{ height: 250 }} />
                                            <Card.Header>
                                                <span>
                                                    {game.name}
                                                </span>
                                                <Dropdown style={{ float: "right" }}  >
                                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" style={{ display: "flex" }}>
                                                        <List />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <DeleteGameModal selectedId={game.id} gameName={game.name} />
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    <p style={{ marginBottom: 8 }}>
                                                        <People style={{ marginBottom: 4 }} />
                                                        <span style={{ marginLeft: 6 }}>
                                                            {
                                                                game.minPlayers === game.maxPlayers ?
                                                                    game.minPlayers :
                                                                    game.minPlayers + " - " + game.maxPlayers
                                                            }
                                                        </span>

                                                        {
                                                            game.bestMinPlayers && game.maxPlayers &&
                                                            <span style={{ marginLeft: 6, display: "inline-flex", alignItems: "center" }}>
                                                                (
                                                                <StarFill size="12" style={{ marginRight: 4, marginLeft: 4, marginTop: 2 }} />
                                                                {
                                                                    game.bestMinPlayers === game.bestMaxPlayers ?
                                                                        game.bestMinPlayers :
                                                                        game.bestMinPlayers + " - " + game.bestMaxPlayers
                                                                }
                                                                <span style={{ whiteSpace: "pre" }}> )</span>
                                                            </span>
                                                        }

                                                        {
                                                            game.minPlaytime && game.maxPlaytime &&
                                                            <span style={{ float: "right" }}>
                                                                <Clock style={{ marginRight: 6 }} />
                                                                <span style={{ marginBottom: 4 }}>

                                                                    {
                                                                        game.minPlaytime === game.maxPlaytime ?
                                                                            game.minPlaytime :
                                                                            game.minPlaytime + " - " + game.maxPlaytime
                                                                    }
                                                                </span>
                                                            </span>
                                                        }

                                                    </p>
                                                    <p style={{ marginTop: 8 }}>
                                                        {
                                                            game.genres && game.genres.length > 0 ? game.genres.join(", ") : <br />
                                                        }
                                                    </p>
                                                    <p>
                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>

                                                <span style={{ float: "right" }}>
                                                    {
                                                        game.bggId
                                                            ? "BGG: " + game.bggId
                                                            : "Manual Entry"
                                                    }
                                                </span>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                </Col >
                            )
                        })
                    }


                </CardGroup>
            </Row >
        </Container >
    );
}

export default GameDBList