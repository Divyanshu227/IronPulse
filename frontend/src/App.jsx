import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import DynamicBackground from './components/DynamicBackground';
import AudioPlayer from './components/AudioPlayer';
import './index.css';
import './dynamic.css';

const App = () => {
  const location = useLocation();

  return (
    <>
      <DynamicBackground />
      <nav className="navbar">
        <Link to="/" className="logo-container">
          <Activity size={36} className="logo-icon" color="var(--primary)" strokeWidth={2.5} />
          <span>GYMBASE</span>
        </Link>
        <AudioPlayer />
      </nav>
       
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
