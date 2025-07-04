import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AnimeSection from '../components/AnimeSection';
import Footer from '../components/Footer';

const Home = () => {
  const { sidebarVisible } = useContext(AppContext);

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        {<Sidebar />}
        <AnimeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;