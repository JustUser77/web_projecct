import React, { useState, useContext, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import useRequireLogin from '../hooks/useRequireLogin';
import '../styles/Music.css';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const musicList = [
  {
    id: 1,
    title: 'Unravel - Tokyo Ghoul',
    artist: 'TK from Ling Tosite Sigure',
    src: 'https://example.com/unravel.mp3',
  },
  {
    id: 2,
    title: 'Gurenge - Demon Slayer',
    artist: 'LiSA',
    src: 'https://example.com/gurenge.mp3',
  },
  {
    id: 3,
    title: 'Again - Fullmetal Alchemist',
    artist: 'YUI',
    src: 'https://example.com/again.mp3',
  },
];

export default function Music() {
  const { sidebarVisible } = useContext(AppContext);
  const { requireLogin, LoginPrompt } = useRequireLogin();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteTracks') || '[]');
    setFavoriteTracks(storedFavorites);

    const storedTrack = JSON.parse(localStorage.getItem('currentTrack') || 'null');
    if (storedTrack) {
      setCurrentTrack(storedTrack);
    }
  }, []);

  const handleSeekToLastTime = () => {
    const savedTime = parseFloat(localStorage.getItem('currentTime') || '0');
    const audioEl = audioRef.current?.audio;
    if (audioEl && !isNaN(savedTime)) {
      audioEl.currentTime = savedTime;
    }
  };

  const handlePlay = (track) => {
    requireLogin(() => {
      setCurrentTrack(track);
      localStorage.setItem('currentTrack', JSON.stringify(track));
      localStorage.setItem('currentTime', '0');
    });
  };

  const handleAddToFavorites = (track) => {
    requireLogin(() => {
      const existing = JSON.parse(localStorage.getItem('favoriteTracks') || '[]');
      const alreadyExists = existing.some((t) => t.id === track.id);
      if (alreadyExists) return;

      const updated = [...existing, track];
      localStorage.setItem('favoriteTracks', JSON.stringify(updated));
      setFavoriteTracks(updated);
    });
  };

  const filteredTracks = musicList.filter((track) =>
    `${track.title} ${track.artist}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetPlayer = () => {
    setCurrentTrack(null);
    localStorage.removeItem('currentTrack');
    localStorage.removeItem('currentTime');
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        {sidebarVisible && <Sidebar />}
        <div className="content">
          <div className="music-page">
            <div className="music-header">
              <h2 className="music-title">🎵 Anime Songs</h2>
              <input
                type="text"
                className="music-search"
                placeholder="🔍 Cari lagu atau artis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="music-container">
              <ul className="music-list">
                {filteredTracks.length > 0 ? (
                  filteredTracks.map((track) => (
                    <li key={track.id} className="music-item">
                      <div>
                        <strong>{track.title}</strong>
                        <p>{track.artist}</p>
                      </div>
                      <div className="music-actions">
                        <button onClick={() => handlePlay(track)}>▶️ Putar</button>
                        <button onClick={() => handleAddToFavorites(track)}>❤️ Simpan</button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="no-results">Tidak ada lagu ditemukan.</p>
                )}
              </ul>

              {currentTrack && (
                <div className="music-player">
                  <h4>Sedang diputar: {currentTrack.title}</h4>
                  <AudioPlayer
                    ref={audioRef}
                    autoPlay
                    src={currentTrack.src}
                    showJumpControls={false}
                    layout="horizontal"
                    customAdditionalControls={[]}
                    onCanPlay={handleSeekToLastTime}
                    onListen={() => {
                      const time = audioRef.current?.audio?.currentTime || 0;
                      localStorage.setItem('currentTime', time.toString());
                    }}
                    style={{
                      borderRadius: '10px',
                      background: '#1e1e1e',
                      color: 'white',
                      boxShadow: '0 0 12px rgba(255, 77, 109, 0.3)',
                    }}
                  />
                  <button className="reset-button" onClick={handleResetPlayer}>
                    ❌ Hentikan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {LoginPrompt}
    </div>
  );
}