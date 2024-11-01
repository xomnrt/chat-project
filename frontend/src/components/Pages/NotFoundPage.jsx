import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


const NotFoundPage = () => {
    return (
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
    )
}


export default NotFoundPage;
