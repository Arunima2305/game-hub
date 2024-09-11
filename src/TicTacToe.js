import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningPattern, setWinningPattern] = useState([]);
  const [isBoardFull, setIsBoardFull] = useState(false);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    const calculatedWinner = checkWinner(newBoard);
    if (calculatedWinner) {
      setWinner(calculatedWinner.winner);
      setWinningPattern(calculatedWinner.pattern);
    } else if (!newBoard.includes('')) {
      setIsBoardFull(true);
    } else if (isSinglePlayer && !calculatedWinner) {
      // Computer's move
      const availableMoves = newBoard
        .map((value, i) => (value === '' ? i : null))
        .filter((value) => value !== null);
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      newBoard[randomMove] = 'O';
      setBoard(newBoard);

      const computerWinner = checkWinner(newBoard);
      if (computerWinner) {
        setWinner(computerWinner.winner);
        setWinningPattern(computerWinner.pattern);
      } else if (!newBoard.includes('')) {
        setIsBoardFull(true);
      }
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], pattern };
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setXIsNext(true);
    setWinner(null);
    setWinningPattern([]);
    setIsBoardFull(false);
  };

  const startGame = () => {
    if (playerX.trim() && (playerO.trim() || isSinglePlayer)) {
      setIsGameStarted(true);
    } else {
      alert('Please enter names for both players.');
    }
  };

  return (
    <div className="container">
      {!isGameStarted && (
        <div className="popup">
          <h2>Choose Game Mode</h2>
          <button
            className="mode-button"
            onClick={() => {
              setIsSinglePlayer(false);
              setPlayerO('');
              setPlayerX('');
            }}
          >
            Two Player
          </button>
          <button
            className="mode-button"
            onClick={() => {
              setIsSinglePlayer(true);
              setPlayerO('Computer');
              setPlayerX('');
            }}
          >
            Single Player
          </button>
          <div>
            <input
              type="text"
              placeholder="Player X Name"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
            />
            {!isSinglePlayer && (
              <input
                type="text"
                placeholder="Player O Name"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
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
          <div className="board">
            {board.map((value, index) => (
              <button
                key={index}
                className={`box ${winningPattern.includes(index) ? 'winner' : ''}`}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>
          <button className="reset" onClick={resetGame}>
            Reset Game
          </button>
          {winner && (
            <div className="msg-container">
              <div className="msg">
                {winner === 'X' ? playerX : playerO} ({winner}) is the Winner!
              </div>
              <button className="play-again" onClick={resetGame}>
                Play Again
              </button>
            </div>
          )}
          {isBoardFull && !winner && (
            <div className="msg-container">
              <div className="msg">Nobody Wins! Play Again?</div>
              <button className="play-again" onClick={resetGame}>
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TicTacToe;
