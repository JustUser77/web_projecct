import React, { useState, useEffect } from 'react';
import '../styles/AnimeCard.css';
import fallbackImage from '../assets/fallback.jpg';
import { useNavigate } from 'react-router-dom';


function AnimeCard({ anime }) {
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFav(favs.includes(anime.mal_id));
  }, [anime.mal_id]);

  const toggleFav = () => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = favs.includes(anime.mal_id)
      ? favs.filter((id) => id !== anime.mal_id)
      : [...favs, anime.mal_id];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFav(!isFav);
  };

  const handleCardClick = () => {
    navigate(`/watch/${anime.mal_id}`); // ✅ fungsi klik
  };

  const onImgError = (e) => {
    e.target.src = fallbackImage;
  };

  const year = anime.aired?.prop?.from?.year || 'Unknown';
  const score = anime.score?.toFixed(1) || 'N/A';
  const reviews = anime.scored_by?.toLocaleString() || 'N/A';

  return (
    <div className="anime-card" onClick={handleCardClick}>
      <div className="image-wrapper">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          onError={onImgError}
          loading="lazy"
        />
      </div>
      <div className="anime-info">
        <h3>{anime.title}</h3>
        <p>📅 {year}</p>
        <p>⭐ {score} / 10</p>
        <p>🗳️ {reviews} users</p>
        <p>🎭 {anime.genres.map((g) => g.name).join(', ')}</p>
        <div className="card-actions">
          <button onClick={toggleFav}>
            {isFav ? '💖 Favorited' : '🤍 Add to Favorites'}
          </button>
          <a
            href={anime.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mal-link"
          >
            View on MAL
          </a>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;