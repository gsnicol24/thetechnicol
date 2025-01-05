import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { PlusLg } from 'react-bootstrap-icons';
import AddGameModal from '../add-game-modal/add-game-modal';
import firebase from 'firebase/compat/app';

function GameDBToolbar(props: { User: firebase.User | undefined }) {

    return (
        <Navbar bg="light" expand={true} fixed="top">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Text>
                    Signed in as: <span style={{ color: 'black' }}>{props.User?.displayName}</span>
                </Navbar.Text>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <AddGameModal />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default GameDBToolbar