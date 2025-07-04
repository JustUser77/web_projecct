import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useRequireLogin from '../hooks/useRequireLogin.jsx';
import { toast } from 'react-toastify'; // ✅ Tambahkan ini
import '../styles/Navbar.css';
import defaultAvatar from '../assets/avatar.png';

function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
    setSidebarVisible,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { requireLogin, LoginPrompt } = useRequireLogin();

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');

    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    toast.info('You have been logged out.'); // ✅ Toast muncul di sini
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">WeiNime</h1>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarVisible((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <button className="login-btn" onClick={() => requireLogin(() => {})}>
            🔐 Login / Sign Up
          </button>
        ) : (
          <div className="profile-dropdown">
            <img
              src={user?.avatar || defaultAvatar}
              alt="avatar"
              className="avatar"
              onClick={handleAvatarClick}
            />
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => navigate('/profile')}>📄 Lihat Profil</li>
                <li onClick={() => requireLogin(() => {})}>🔄 Ganti Akun</li>
                <li onClick={handleLogout}>🚪 Logout</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* ✅ Modal login muncul jika diperlukan */}
      {LoginPrompt}
    </nav>
  );
}

export default Navbar;