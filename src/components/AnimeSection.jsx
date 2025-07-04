import React, { useEffect, useState, useContext } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import animeList from '../data/animeList';
import AnimeCard from './AnimeCard';
import '../styles/AnimeSection.css';
import { AppContext } from '../context/AppContext';

function AnimeSection() {
  const { searchQuery } = useContext(AppContext);
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          animeList.map(({ id }) =>
            fetch(`https://api.jikan.moe/v4/anime/${id}`)
              .then((res) => res.json())
              .then((j) => j.data)
              .catch(() => null)
          )
        );
        setAnimeData(results.filter(Boolean));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = animeData.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="anime-section">
      {loading ? (
        <div className="loading-container">
          <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150 }} />
        </div>
      ) : (
        <div className="anime-grid">
          {filtered.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AnimeSection;