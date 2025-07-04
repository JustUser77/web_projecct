import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import '../styles/LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 200 }} />
      <p>Welcome</p>
    </div>
  );
}