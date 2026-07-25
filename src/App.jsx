import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import './App.css';

function App() {
    const [language, setLanguage] = useState('hu');

    return (
        <Routes>
            <Route path="/" element={<Home language={language} onLanguageChange={setLanguage} />} />
            <Route path="/about" element={<About language={language} onLanguageChange={setLanguage} />} />
            <Route path="/works" element={<Navigate to="/books" replace />} />ű
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
