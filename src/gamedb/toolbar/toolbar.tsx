import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { PlusLg } from 'react-bootstrap-icons';
import AddGameModal from '../add-game-modal/add-game-modal';

function GameDBToolbar() {

    return (
        <Navbar bg="light" expand={true} fixed="top">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
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