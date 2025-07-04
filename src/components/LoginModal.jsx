import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import '../styles/LoginModal.css';

function LoginModal({ onClose, onSuccess }) {
  const { setIsLoggedIn, setUser } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setError('');
    setShowPassword(false);
    setMode('login');
  }, []);

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      toast.warn('Please fill in both fields.');
      setShake(true);
      return;
    }

    if (mode === 'signup') {
      const exists = users.find((u) => u.username === username);
      if (exists) {
        setError('Username already exists.');
        toast.warning('Username already exists.');
        setShake(true);
        return;
      }

      const newUser = { username, password };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));

      const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`;
      const userData = { name: username, avatar: avatarUrl };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');

      setUser(userData);
      setIsLoggedIn(true);
      toast.success('Account created successfully!');
      if (onSuccess) onSuccess(); // ✅ panggil callback dari useRequireLogin
    } else {
      const found = users.find((u) => u.username === username && u.password === password);
      if (!found) {
        setError('Invalid username or password.');
        toast.error('Invalid username or password.');
        setShake(true);
        return;
      }

      const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`;
      const userData = { name: username, avatar: avatarUrl };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');

      setUser(userData);
      setIsLoggedIn(true);
      toast.success(`Welcome back, ${username}!`);
      if (onSuccess) onSuccess(); // ✅ panggil callback dari useRequireLogin
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div
        className="login-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: shake ? 0.4 : 0.3 }}
        onAnimationComplete={() => setShake(false)}
      >
        <h2>{mode === 'login' ? '🔐 Log In' : '🆕 Sign Up'}</h2>

        {username && (
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`}
            alt="avatar"
            className="avatar-preview"
          />
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

        <div className="modal-buttons">
          <button onClick={handleSubmit}>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
          <button onClick={() => setTimeout(onClose, 300)}>Close</button>
        </div>

        <p className="switch-mode">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <span onClick={() => { setMode('signup'); setError(''); }}>Sign up here</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => { setMode('login'); setError(''); }}>Log in here</span>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default LoginModal;