import LoginForm from "../PagesInnerComponents/LoginForm.jsx"
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import { VantaBackground } from "../VantaBackground";


const LoginPage = () => {
    return (
        <VantaBackground>
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm opacity-75">
                <Container>
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                </Container>
            </Navbar>
            <LoginForm />
        </VantaBackground>
    )
}

export default LoginPage;
