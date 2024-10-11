import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";

const MainPage = () => {

    return (
        <Container h-100>
            Welcome to the chat!
        </Container>
    )
}

const NotFoundPage = () => {
    return (
        <div>
            404 Not Found
        </div>
    )
}

export { MainPage, NotFoundPage };
