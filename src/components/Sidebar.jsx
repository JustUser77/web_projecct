import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Sidebar.css';

function Sidebar() {
  const { sidebarVisible } = useContext(AppContext);

  return (
    <AnimatePresence>
      {sidebarVisible && (
        <motion.aside
          key="sidebar"
          className="sidebar"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <ul>
            <li><NavLink to="/" className="sidebar-link">🏠 Home</NavLink></li>
            <li><NavLink to="/profile" className="sidebar-link">👤 Profile</NavLink></li>
            <li><NavLink to="/explore" className="sidebar-link">🔍 Explore</NavLink></li>
            <li><NavLink to="/watch" className="sidebar-link">🎬 Watch</NavLink></li>
            <li><NavLink to="/music" className="sidebar-link">🎵 Music</NavLink></li>
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;