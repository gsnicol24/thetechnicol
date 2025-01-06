
import { initializeApp } from "firebase/app";
import { QuerySnapshot, getFirestore, onSnapshot } from "firebase/firestore";
import FirebaseConfig from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Game } from "./models/game"
import Card from 'react-bootstrap/Card';
import { List, MenuApp, MenuButton, People } from "react-bootstrap-icons";
import { Button, CardGroup, Col, Container, Dropdown, Row } from "react-bootstrap";
import React from "react";
import './gamedb-list.scss'
import DeleteGameModal from "./delete-game-modal/delete-game-modal";

function GameDBList() {
    const [games, setGames] = useState<Game[]>()
    // Initialize Firebase
    const app = initializeApp(FirebaseConfig);
    const db = getFirestore(app);

    const unsub = onSnapshot(collection(db, "games"), snapshot => {
        const gameDocs = snapshot.docs
            .map(doc => {
                const docData = doc.data();
                const game = docData as Game;
                game.id = doc.id;
                return game;
            })
            .sort((a, b) => a.name.localeCompare(b.name))
        setGames(gameDocs)
    });

    return (
        <Container style={{ marginTop: 100 }}>
            <Row>
                <CardGroup>
                    {
                        games?.map((game) => {
                            return (
                                <Col key={game.id} xs={12} md="6" lg="3">
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                        <Card style={{ minWidth: "90%", maxWidth: "90%" }}>
                                            <Card.Img variant="top" src={game.img ?? "question-mark.jpg"} style={{ height: 250, objectFit: "cover" }} />
                                            <Card.Body>
                                                <Card.Title>{game.name}</Card.Title>
                                                <Card.Text>
                                                    <p>
                                                        <People />
                                                        <span style={{ marginLeft: 6 }}>
                                                            {
                                                                game.minPlayers === game.maxPlayers ?
                                                                    game.minPlayers :
                                                                    game.minPlayers + " - " + game.maxPlayers
                                                            }
                                                        </span>
                                                    </p>
                                                    <p style={{ marginTop: 8 }}>
                                                        {
                                                            game.genres && game.genres.length > 0 ? game.genres.join(", ") : <br />
                                                        }
                                                    </p>
                                                    <p>
                                                        <Dropdown style={{ float: "right" }}  >
                                                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" style={{ display: "flex" }}>
                                                                <List />
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <DeleteGameModal selectedId={game.id} gameName={game.name} />
                                                            </Dropdown.Menu>
                                                        </Dropdown>
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