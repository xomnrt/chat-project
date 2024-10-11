import LoginForm from "./LoginForm.jsx"
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import React from "react"


const LoginPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                <Container>
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                </Container>
            </Navbar>
            <LoginForm />
        </div>
    )
}

export default LoginPage;
