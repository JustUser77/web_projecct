import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import '../styles/Profile.css';

const defaultAvatar = 'https://i.imgur.com/0y0y0y0.png'; // Ganti dengan avatar default kamu

export default function Profile() {
  const { sidebarVisible } = useContext(AppContext);

  const [user, setUser] = useState({
    name: 'Christian',
    bio: 'Penggemar Isekai garis keras',
    avatar: null,
  });

  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    const com = JSON.parse(localStorage.getItem('comments') || '[]');
    const watch = JSON.parse(localStorage.getItem('watched') || '[]');

    setFavorites(fav);
    setComments(com);
    setWatched(watch);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
  };

  const handleEdit = () => {
    alert('Fitur edit profil belum tersedia 😅');
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        {sidebarVisible && <Sidebar />}
        <div className="content">
          <motion.div
            className="profile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="profile-header">
              <img src={user.avatar || defaultAvatar} alt="Avatar" />
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
            </div>

            <div className="profile-stats">
              <div><strong>{favorites.length}</strong><span>Favorit</span></div>
              <div><strong>{watched.length}</strong><span>Ditonton</span></div>
              <div><strong>{comments.length}</strong><span>Komentar</span></div>
            </div>

            <div className="profile-actions">
              <button onClick={handleEdit}>✏️ Edit Profil</button>
              <button onClick={clearFavorites}>🗑️ Hapus Favorit</button>
            </div>

            <div className="favorite-anime">
              <h3>Favorit Saya</h3>
              {favorites.length === 0 ? (
                <p>Belum ada anime favorit.</p>
              ) : (
                <div className="anime-grid">
                  {favorites.map(anime => (
                    <Link to={`/watch?id=${anime.mal_id}`} key={anime.mal_id}>
                      <img src={anime.image_url || anime.images?.jpg?.image_url} alt={anime.title} />
                      <p>{anime.title}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="recent-comments">
              <h3>Komentar Terakhir</h3>
              {comments.length === 0 ? (
                <p>Belum ada komentar.</p>
              ) : (
                <ul>
                  {comments.slice(-5).reverse().map((c, i) => (
                    <li key={i}>
                      <p>"{c.text}"</p>
                      <span>{new Date(c.date).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}