import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import IntroPage from './pages/IntroPage';
import MenuPage from './pages/MenuPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router basename="/chatbot"> {/* 👈 THIS FIXES IT */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
