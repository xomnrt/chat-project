import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, NotFoundPage } from './Components/Pages.jsx';
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
