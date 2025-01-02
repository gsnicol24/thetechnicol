
import { initializeApp } from "firebase/app";
import { QuerySnapshot, getFirestore, onSnapshot } from "firebase/firestore";
import FirebaseConfig from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Game } from "./models/game"
import Card from 'react-bootstrap/Card';
import { People } from "react-bootstrap-icons";
import { Col, Container, Row } from "react-bootstrap";

function GameDBList() {
    const [games, setGames] = useState<Game[]>()
    const [updateNeeded, setUpdateNeeded] = useState(true);
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
        setGames(gameDocs)
    });

    // useEffect(() => {
    //     async function updateGameList() {
    //         const querySnapshot = await getDocs(collection(db, "games"));
    //         const gameDocs = querySnapshot.docs
    //             .map(doc => {
    //                 const docData = doc.data();
    //                 const game = docData as Game;
    //                 game.id = doc.id;
    //                 return game;
    //             })
    //         setGames(gameDocs)

    //     }

    //     if (updateNeeded) {
    //         setUpdateNeeded(false)
    //         updateGameList();
    //     }
    // })

    return (
        <Container style={{ marginTop: 100 }}>
            <Row>
                {
                    games?.map((game) => {
                        return (
                            <Col key={game.id} xs={12} md="6" lg="3">
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                    <Card style={{ maxWidth: '18rem' }}>
                                        <Card.Img variant="top" src={game.img} />
                                        <Card.Body>
                                            <Card.Title>{game.name}</Card.Title>
                                            <Card.Text>
                                                <div>
                                                    <People />
                                                    <span style={{ marginLeft: 6 }}>
                                                        {
                                                            game.minPlayers === game.maxPlayers ?
                                                                game.minPlayers :
                                                                game.minPlayers + " - " + game.maxPlayers
                                                        }
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: 8 }}>
                                                    {
                                                        game.genre ? game.genre.join(", ") : <br />
                                                    }
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col >
                        )
                    })
                }

            </Row >
        </Container >
    );
}

export default GameDBList