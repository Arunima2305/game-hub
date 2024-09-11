import React, { useState, useEffect } from 'react';
import './ConnectFour.css';

const ConnectFour = () => {
  const columns = 7;
  const rows = 6;
  const [grid, setGrid] = useState(Array(rows).fill(null).map(() => Array(columns).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState('');
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  useEffect(() => {
    if (isSinglePlayer && currentPlayer === 'yellow' && gameActive) {
      const availableCols = grid[0].map((_, colIndex) => colIndex).filter(col => !grid[0][col]);
      const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
      placeDisc(randomCol);
    }
  }, [currentPlayer, isSinglePlayer, grid, gameActive]);

  const checkWin = (newGrid) => {
    const checkDirection = (rowStart, colStart, rowStep, colStep) => {
      let count = 0;
      for (let i = 0; i < 4; i++) {
        const row = rowStart + i * rowStep;
        const col = colStart + i * colStep;
        if (row >= 0 && row < rows && col >= 0 && col < columns && newGrid[row][col] === currentPlayer) {
          count++;
          if (count === 4) {
            return true;
          }
        }
      }
      return false;
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (
          checkDirection(row, col, 1, 0) || // Vertical
          checkDirection(row, col, 0, 1) || // Horizontal
          checkDirection(row, col, 1, 1) || // Diagonal down-right
          checkDirection(row, col, 1, -1)   // Diagonal down-left
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const placeDisc = (col) => {
    if (!gameActive) return;

    const newGrid = grid.map(row => [...row]);
    for (let row = rows - 1; row >= 0; row--) {
      if (!newGrid[row][col]) {
        newGrid[row][col] = currentPlayer;
        setGrid(newGrid);
        if (checkWin(newGrid)) {
          const winnerName = currentPlayer === 'red' ? player1Name : player2Name;
          setMessage(`${winnerName} wins!`);
          setGameActive(false);
          setShowWinnerPopup(true);
        } else if (newGrid.flat().every(cell => cell)) {
          setMessage("It's a draw!");
          setGameActive(false);
          setShowWinnerPopup(true);
        } else {
          setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
        }
        break;
      }
    }
  };

  const resetGame = () => {
    setGrid(Array(rows).fill(null).map(() => Array(columns).fill(null)));
    setCurrentPlayer('red');
    setGameActive(false);
    setMessage('');
    setPlayer1Name('');
    setPlayer2Name('');
    setIsGameStarted(false);
    setShowWinnerPopup(false);
  };

  const startGame = () => {
    if (player1Name.trim() && (player2Name.trim() || isSinglePlayer)) {
      setGameActive(true);
      setIsGameStarted(true);
    } else {
      alert('Please enter names for both players.');
    }
  };

  return (
    <div className="connect-four">
      {!isGameStarted && (
        <div className="popup">
          <h2>Choose Game Mode</h2>
          <button
            className="mode-button"
            onClick={() => {
              setIsSinglePlayer(false);
              setPlayer2Name(''); // Clear Player 2's name until entered
            }}
          >
            Two Player
          </button>
          <button
            className="mode-button"
            onClick={() => {
              setIsSinglePlayer(true);
              setPlayer2Name('Computer'); // Set Player 2 to Computer
            }}
          >
            Single Player
          </button>
          <div>
            <input
              type="text"
              placeholder="Player 1 Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            {!isSinglePlayer && (
              <input
                type="text"
                placeholder="Player 2 Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            )}
          </div>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}
      {isGameStarted && (
        <>
          <div id="board">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${cell}`}
                  onClick={() => placeDisc(colIndex)}
                ></div>
              ))
            )}
          </div>
          <button onClick={resetGame} className="reset-button">Reset Game</button>
        </>
      )}
      {showWinnerPopup && (
        <div className="winner-popup">
          <h2>{message}</h2>
          <button onClick={resetGame} className="play-again-button">Play Again</button>
        </div>
      )}
    </div>
  );
};

export default ConnectFour;
