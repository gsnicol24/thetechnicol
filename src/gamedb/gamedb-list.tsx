
import { initializeApp } from "firebase/app";
import { QuerySnapshot, getFirestore, onSnapshot } from "firebase/firestore";
import FirebaseConfig from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Game } from "./models/game"
import Card from 'react-bootstrap/Card';
import { People } from "react-bootstrap-icons";

function GameDBList() {
    const [games, setGames] = useState<Game[]>()
    const [updateNeeded, setUpdateNeeded] = useState(true);
    // Initialize Firebase
    const app = initializeApp(FirebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        async function updateGameList() {
            const querySnapshot = await getDocs(collection(db, "games"));
            const gameDocs = querySnapshot.docs
                .map(doc => doc.data())
                .map(docData => docData as Game)
            setGames(gameDocs)

        }

        if (updateNeeded) {
            setUpdateNeeded(false)
            updateGameList();
        }
    })

    games?.forEach(game => {
        console.log(game)
    });

    return (
        <div style={{ marginTop: 100 }}>
            {
                games?.map((game) => {
                    return (
                        <Card style={{ width: '18rem' }}>
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
                                            game.genre.join(", ")
                                        }
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    );
}

export default GameDBList