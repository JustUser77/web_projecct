import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import animeList from '../data/animeList';
import { motion } from 'framer-motion';
import '../styles/Explore.css';

const genreEmojis = {
  Action: "⚔️",
  Adventure: "🧭",
  Comedy: "😂",
  Drama: "🎭",
  Fantasy: "🧙‍♂️",
  Romance: "❤️",
  Horror: "👻",
  "Sci-Fi": "🚀",
  "Slice of Life": "🍃",
  Sports: "🏅",
};

const Explore = () => {
  const { sidebarVisible } = useContext(AppContext);
  const [customAnimeList, setCustomAnimeList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    const fetchCustomAnime = async () => {
      const results = await Promise.all(
        animeList.map((anime, i) =>
          new Promise(resolve =>
            setTimeout(() => {
              fetch(`https://api.jikan.moe/v4/anime/${anime.id}`)
                .then(res => res.json())
                .then(data => {
                  if (data.data) {
                    const genres = data.data.genres.map(g => g.name);
                    resolve({ ...data.data, localGenres: genres });
                  } else {
                    resolve(null);
                  }
                })
                .catch(() => resolve(null));
            }, i * 300)
          )
        )
      );

      const filtered = results.filter(Boolean);
      setCustomAnimeList(filtered);

      const genreSet = new Set();
      filtered.forEach(anime => {
        anime.localGenres?.forEach(g => genreSet.add(g));
      });
      setAvailableGenres(Array.from(genreSet).sort());
    };

    fetchCustomAnime();
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredAnime = selectedGenres.length === 0
    ? customAnimeList
    : customAnimeList.filter(anime =>
        selectedGenres.every(g => anime.localGenres?.includes(g))
      );

  const renderSection = (title, data) => (
    data?.length > 0 && (
      <section className="explore-section">
        <h2>{title}</h2>
        <div className="anime-grid">
          {data.map(anime => (
            <motion.div
              key={anime.mal_id}
              className="anime-card"
              whileHover={{ scale: 1.05 }}
            >
              <a href={`/watch/${anime.mal_id}`}>
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <div className="anime-info">
                  <h3>{anime.title}</h3>
                  <p>⭐ {anime.score || 'N/A'}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    )
  );

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        {sidebarVisible && <Sidebar />}
        <div className="content">
          <div className="explore-wrapper">
            <div className="genre-filter">
              <h2>🎞️ Choose Genre</h2>
              <div className="genre-buttons">
                {availableGenres.map(genre => (
                  <button
                    key={genre}
                    className={`genre-btn ${selectedGenres.includes(genre) ? 'active' : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    <span className="genre-emoji">{genreEmojis[genre] || "🎬"}</span> {genre}
                  </button>
                ))}
              </div>
            </div>

            {renderSection(
              selectedGenres.length > 0
                ? `🎬 Genre: ${selectedGenres.join(', ')}`
                : '🎯 Semua Anime',
              filteredAnime
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;