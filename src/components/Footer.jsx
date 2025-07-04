import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/footer.json';
import '../styles/Footer.css';
import emailIcon from '../assets/icon/email.png';
import facebookIcon from '../assets/icon/facebook.png';
import youtubeIcon from '../assets/icon/youtube.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
  <a href="mailto:christiangeovanyy@gmail.com" title="Email">
    <img src={emailIcon} alt="Email" className="footer-icon" />
  </a>
  <a href="https://www.facebook.com/onedirectionmusic" target="_blank" rel="noopener noreferrer" title="Facebook">
    <img src={facebookIcon} alt="Facebook" className="footer-icon" />
  </a>
  <a href="https://www.youtube.com/user/OneDirectionVEVO" target="_blank" rel="noopener noreferrer" title="YouTube">
    <img src={youtubeIcon} alt="YouTube" className="footer-icon" />
  </a>
</div>
        <div className="footer-links">
          <Link to="/about">About</Link>
        </div>
        <div className="footer-brand">
          WeiNime © {new Date().getFullYear()}
        </div>
      </div>

      
      <div className="footer-lottie">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </footer>
  );
}