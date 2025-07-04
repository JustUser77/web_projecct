import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/loading.json'; // ganti dengan animasi kamu
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LoadingOverlay;