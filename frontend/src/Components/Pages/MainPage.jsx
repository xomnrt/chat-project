import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';

const Chats = () => {
    return;
}

const MainPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                <Container>
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                </Container>
            </Navbar>
            <Chats></Chats>
        </div>
    )
}

export default MainPage;
