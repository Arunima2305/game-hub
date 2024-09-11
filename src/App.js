import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import TicTacToe from './TicTacToe';

import Hangman from './Hangman';
import ConnectFour from './ConnectFour';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
      
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/connect-four" element={<ConnectFour />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
