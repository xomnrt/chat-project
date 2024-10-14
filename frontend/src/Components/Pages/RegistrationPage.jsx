import RegistrationForm from "../Forms/RegistrationForm.jsx"
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";


const RegistrationPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                <Container>
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                </Container>
            </Navbar>
            <RegistrationForm />
        </div>
    )
}

export default RegistrationPage;
