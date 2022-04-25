import { Container, Navbar, Form, Nav } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const FilmNav = () => {
    return (
        <Navbar variant="dark" bg="primary" expand="lg">
            <Container fluid className="m-0">
                <Navbar.Toggle />
                <Navbar.Brand href="#">
                    <i className="bi bi-collection-play-fill m-1" style={{ fontSize: 24, color: "white" }}></i>
                Film Library
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-center">
                    <Form>
                        <Form.Control type="search" placeholder="Search"></Form.Control>
                    </Form>
                </Navbar.Collapse>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="#" className="p-0 m-0">
                            <i className="bi bi-person-circle" style={{ fontSize: 32, color: "white", opacity: "60%" }}></i>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default FilmNav;