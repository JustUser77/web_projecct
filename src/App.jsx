import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Watch from './pages/Watch';
import Music from './pages/Music';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/music" element={<Music />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </Router>
      )}
    </AppProvider>
  );
}