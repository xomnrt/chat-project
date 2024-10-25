import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage.jsx"
import MainPage from "./Pages/MainPage.jsx"
import NotFoundPage from "./Pages/NotFoundPage.jsx"
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import routes from "../routes/routes.js"
import { AuthContext } from '../contexts/AuthProvider.jsx';
import { useContext } from 'react';


function Router() {

  const authContext = useContext(AuthContext);
  console.log(authContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.signup} element={<RegistrationPage />} />
        <Route path={routes.main} element={authContext.isLoggedIn() ? <MainPage /> : <Navigate replace to={routes.login} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
