import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./Components/Pages/LoginPage.jsx"
import MainPage from "./Components/Pages/MainPage.jsx"
import NotFoundPage from "./Components/Pages/NotFoundPage.jsx"
import RegistrationPage from "./Components/Pages/RegistrationPage.jsx"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
