import LoginForm from "./LoginForm.jsx"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";



const LoginPage = () => {
    return (
        <Container className="vh-100 vw-100">
            <Row>
                <Container>
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                        </Container>
                    </Navbar>
                </Container>
            </Row>
            <Row>
                <Col>
                    <Container className="vw-100">
                        <LoginForm />
                    </Container>
                </Col>
            </Row>
        </Container>

    )
}

export default LoginPage;
