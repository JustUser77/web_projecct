import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/Watch.css';

const KONOSUBA_ID = 30831;

const Watch = () => {
  const { sidebarVisible } = useContext(AppContext);
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(() => {
    const saved = localStorage.getItem("favorites") || "[]";
    return JSON.parse(saved).includes(KONOSUBA_ID);
  });

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${KONOSUBA_ID}`);
      const data = await res.json();
      setAnime(data.data);
    };

    const fetchEpisodes = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${KONOSUBA_ID}/episodes`);
      const data = await res.json();
      setEpisodes(data.data);
    };

    fetchAnime();
    fetchEpisodes();
  }, []);

  const currentEpisode = episodes[currentIndex];

  const getYoutubeId = () => {
    return (
      currentEpisode?.videos?.[0]?.youtube_id ||
      anime?.trailer?.youtube_id ||
      "dQw4w9WgXcQ"
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [...prev, { text: newComment, date: new Date() }]);
    setNewComment("");
  };

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = favorited
      ? saved.filter(id => id !== KONOSUBA_ID)
      : [...saved, KONOSUBA_ID];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorited(!favorited);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link disalin ke clipboard!");
  };

  if (!anime || episodes.length === 0) {
    return <div className="loading">Memuat KonoSuba...</div>;
  }

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        {sidebarVisible && <Sidebar />}
        <div className="content">
          <div className="watch-wrapper">
            <div className="watch-grid">
              {/* KIRI */}
              <div className="left-column">
                <div className="video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeId()}`}
                    title={currentEpisode?.title}
                    allowFullScreen
                  ></iframe>
                </div>

                <h1 className="anime-title">
                  {anime.title} - {currentEpisode?.title}
                </h1>

                <div className="action-buttons">
                  <button onClick={() => setLiked(!liked)}>
                    {liked ? "👍 Disukai" : "👍 Like"}
                  </button>
                  <button onClick={handleShare}>🔗 Share</button>
                  <button onClick={toggleFavorite}>
                    {favorited ? "💔 Unfavorite" : "❤️ Favorite"}
                  </button>
                </div>

                <div className="episode-description">
                  {currentEpisode?.synopsis || anime.synopsis}
                </div>

                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar..."
                  />
                  <button type="submit">Kirim</button>
                </form>

                <div className="comment-list">
                  {comments.map((c, i) => (
                    <div key={i} className="comment">
                      <p>{c.text}</p>
                      <span>{c.date.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KANAN */}
              <div className="right-column">
                <h3>Episode Lainnya</h3>
                <div className="episode-list">
                  {episodes.map((ep, i) => (
                    <button
                      key={ep.mal_id}
                      className={i === currentIndex ? 'active' : ''}
                      onClick={() => setCurrentIndex(i)}
                    >
                      Ep {i + 1}: {ep.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Watch;