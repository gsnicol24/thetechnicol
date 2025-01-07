
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactGA from 'react-ga4'
import { useEffect, useState } from 'react';
import './gamedb.scss'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseConfig from './firebase-config';
import 'firebase/compat/auth';
import GameDBToolbar from './toolbar/toolbar';
import GameDBList from './gamedb-list';
import { Game } from './models/game';
import { getFirestore, onSnapshot, collection } from 'firebase/firestore';
import { FilterQuery } from './models/filter';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

const app = initializeApp(FirebaseConfig);
const analytics = getAnalytics(app);

const TRACKING_ID = "UA-301142432"
function GameDB() {
    const [user, setUser] = useState<firebase.User | undefined>()
    const [games, setGames] = useState<Game[]>([])

    const [filter, setFilter] = useState<FilterQuery | undefined>(undefined)

    const [maxPlaytime, setMaxPlaytime] = useState(Number.MIN_VALUE);
    const [minPlaytime, setMinPlaytime] = useState(Number.MAX_VALUE);
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

            if (!!filter) {
                var { searchText, players, playtime } = filter;

                gameDocs = gameDocs.filter(gameDoc => {
                    if (!!searchText && gameDoc.name.toUpperCase().indexOf(filter.searchText!.toUpperCase()) === -1) {
                        return false;
                    }

                    if (!!players && (gameDoc.maxPlayers < players || gameDoc.minPlayers > players)) {
                        return false;
                    }

                    if (!!playtime && (gameDoc.minPlaytime > playtime)) {
                        return false;
                    }

                    return true;
                });
            }

            gameDocs.forEach(game => {
                if (maxPlaytime < game.maxPlaytime) {
                    setMaxPlaytime(game.maxPlaytime)
                }

                if (minPlaytime > game.minPlaytime) {
                    console.log("Updating min playtime from " + minPlaytime + " to " + game.minPlaytime)
                    setMinPlaytime(game.minPlaytime)
                }
            })

            setGames(gameDocs)
        });
    })

    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.send({ hitType: "pageview", page: "/gamedb", title: "GameDB" });
    }, [])

    firebase.initializeApp(FirebaseConfig);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, disableSignUp: { status: true, helpLink: undefined }
            }
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },

    };


    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setUser(!!user ? user : undefined)
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div className="login-container">
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }

    return (
        <div className="App">
            <GameDBToolbar User={user} setFilterQuery={setFilter} minPlaytime={minPlaytime} maxPlaytime={maxPlaytime} />
            <div style={{ marginTop: 100 }}>
                <Container>
                    <Row>
                        <Col>
                            {
                                (!!filter?.players || !!filter?.playtime) &&
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ marginBottom: 8 }}>Filtering on:</div>
                                    {
                                        !!filter.players &&
                                        <div style={{ border: "1px solid gray", padding: "5px 10px", borderRadius: 10, display: 'inline-block', marginRight: 8 }}>
                                            <b>Players:</b> {filter.players}
                                            <Button variant='outline-danger' style={{ marginLeft: 8, display: "inline-flex", alignItems: "center" }} size='sm' onClick={() => filter.players = undefined}>
                                                <X />
                                            </Button>
                                        </div>
                                    }
                                    {
                                        !!filter.playtime &&
                                        <div style={{ border: "1px solid gray", padding: "5px 10px", borderRadius: 10, display: 'inline-block' }}>
                                            <b>Playtime:</b> {filter.playtime}
                                            <Button variant='outline-danger' style={{ marginLeft: 8, display: "inline-flex", alignItems: "center" }} size='sm' onClick={() => filter.playtime = undefined}>
                                                <X />
                                            </Button>
                                        </div>
                                    }
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
            <GameDBList games={games} />
        </div>
    );
}

export default GameDB;
