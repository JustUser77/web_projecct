import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import '../styles/Profile.css';

const defaultAvatar = 'https://i.imgur.com/WjchBGt.jpeg'; // Ganti dengan avatar default kamu

export default function Profile() {
  const { sidebarVisible } = useContext(AppContext);

  const [user, setUser] = useState({
    name: 'Christian Phantomhive',
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

    console.log('favorites:', fav);

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

  const [activeTab, setActiveTab] = useState('favorites');


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
              <div className="profile-info-wrapper">
                <h2>{user.name}</h2>

            <div className="profile-stats">
              <div><strong>{favorites.length}</strong><span>Favorit</span></div>
              <div><strong>{watched.length}</strong><span>Ditonton</span></div>
              <div><strong>{comments.length}</strong><span>Komentar</span></div>
            </div>

            <div className="profile-actions">
              <button onClick={handleEdit}>Edit Profil</button>
              <button onClick={clearFavorites}>Hapus Favorit</button>
            </div>

            <p>{user.bio}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={activeTab === 'favorites' ? 'active' : ''}
            onClick={() => setActiveTab('favorites')}
          >
            ⭐ Favorit
          </button>
          <button
            className={activeTab === 'comments' ? 'active' : ''}
            onClick={() => setActiveTab('comments')}
          >
            💬 Komentar
          </button>
        </div>


            {activeTab === 'favorites' && (
            <div className="favorite-anime">
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
          )}

          {activeTab === 'comments' && (
            <div className="recent-comments">
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
          )}

          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}