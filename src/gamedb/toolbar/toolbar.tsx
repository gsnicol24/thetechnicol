import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { PlusLg } from 'react-bootstrap-icons';
import AddGameModal from '../add-game-modal/add-game-modal';
import firebase from 'firebase/compat/app';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

function GameDBToolbar(props: {
    User: firebase.User | undefined,
    setSearchText: React.Dispatch<React.SetStateAction<string | undefined>>
}) {

    const [searchText, setSearchText] = useState<string | undefined>()

    const updateSearchText = (searchText: string) => {
        setSearchText(searchText);
        props.setSearchText(searchText)
    }

    return (
        <Navbar bg="light" expand={true} fixed="top">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Text>
                    Signed in as: <span style={{ color: 'black' }}>{props.User?.displayName}</span>
                </Navbar.Text>
                <Navbar.Collapse className="justify-content-end">

                    <Nav>
                        <span style={{ marginRight: 16 }}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2"
                                value={searchText}
                                onChange={e => updateSearchText(e.target.value)}
                            />
                        </span>
                        <AddGameModal />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default GameDBToolbar