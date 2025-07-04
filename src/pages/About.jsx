// src/pages/Home.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import AnimeSection from '../components/AnimeSection';

const Home = () => {
  const { sidebarVisible } = useContext(AppContext);

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        {sidebarVisible && <Sidebar />}
        <AnimeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;