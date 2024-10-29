import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import ChatsView from '../PagesInnerComponents/ChatsView.jsx'
import { VantaBackground } from "../VantaBackground";
import LogOutButton from "../PagesInnerComponents/LogOutButton.jsx"


const MainPage = () => {
    return (
        <VantaBackground>
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm opacity-75">
                <Container>
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                    <LogOutButton></LogOutButton>
                </Container>
            </Navbar>
            <ChatsView></ChatsView>
        </VantaBackground>
        )
}

export default MainPage;
