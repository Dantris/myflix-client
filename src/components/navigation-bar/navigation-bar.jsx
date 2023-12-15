import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../navigation-bar/navigation-bar.scss"

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="black" variant="secondary" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Add Links here */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};