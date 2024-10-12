import React from 'react';
import '../App.css'; 
import video from '../assets/Ecommerce.mp4'; 

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="text-section">
          <h1>Welcome to ShoppyGlobe</h1>
          <p>Your one-stop shop for all your needs!</p>
          <a href="/products">
            <button className="start-shopping-button">Start Shopping</button>
          </a>
        </div>
        <div className="video-section">
          
          <video src={video} autoPlay loop muted className="ecommerce-video"></video>
        </div>
      </div>
    </div>
  );
};

export default Home;
