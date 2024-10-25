import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { VantaBackground } from "../VantaBackground";


const NotFoundAlert = () => {
    return (
    <VantaBackground>
        <Container fluid className="h-100 opacity-75">
            <Row className="justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm text-center">
                        <Card.Body className="mx-auto row p-5">
                            <h1>404 Not Found</h1>
                            <h2>Страница не существует</h2>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </Container>
    </VantaBackground>

    )
}


const NotFoundPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm opacity-75">
                <Container>
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                </Container>
            </Navbar>

            <NotFoundAlert />
        </div>
    )
}

export default NotFoundPage;
