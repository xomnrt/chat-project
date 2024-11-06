import {
  BrowserRouter, Route, Routes, Navigate, Link,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import routes from '../routes/routes.js';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './Pages/LoginPage.jsx';
import MainPage from './Pages/MainPage.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import RegistrationPage from './Pages/RegistrationPage.jsx';

import LogOutButton from './PagesInnerComponents/LogOutButton.jsx';

import { AuthContext } from '../contexts/AuthProvider.jsx';

const Router = () => {
  const authContext = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div
        className="d-flex flex-column h-100 my-bg"
      >
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
          <Container>
            <Link className="navbar-brand" to="/">Hexlet Chat</Link>
            {authContext.isLoggedIn() && <LogOutButton />}
          </Container>
        </Navbar>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<RegistrationPage />} />
          <Route path={routes.main} element={
            authContext.isLoggedIn() ? < MainPage /> : <Navigate replace to={routes.login} />
          } />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rt1={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </div>
    </BrowserRouter>
  );
};

export default Router;
