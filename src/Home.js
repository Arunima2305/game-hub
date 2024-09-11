import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import HangmanImage from './images/Hangman.png';
import ConnectFourImage from './images/ConnectFour.png';
import TicTacToeImage from './images/TicTacToe.png'; // Ensure you have this image in your images folder

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to PlaySphere</h1>
      <p className="home-subtitle">A curated collection of timeless challenges. Engage your mind, test your skills, and experience the art of classic gameplay in a refined setting.</p>
      <div className="game-selection">
        <Link to="/tic-tac-toe">
          <div className="game-card">
            <img src={TicTacToeImage} alt="Tic Tac Toe" className="game-image" />
            <button className="game-button">Tic Tac Toe</button>
          </div>
        </Link>
        
        <Link to="/hangman">
          <div className="game-card">
            <img src={HangmanImage} alt="Hangman" className="game-image" />
            <button className="game-button">Hangman</button>
          </div>
        </Link>
        <Link to="/connect-four">
          <div className="game-card">
            <img src={ConnectFourImage} alt="Connect Four" className="game-image" />
            <button className="game-button">Connect Four</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
