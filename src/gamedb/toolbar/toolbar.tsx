import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { PlusLg } from 'react-bootstrap-icons';

function GameDBToolbar() {

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">
                            <PlusLg />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default GameDBToolbar