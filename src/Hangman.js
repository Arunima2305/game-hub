import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hangman.css';

const words = {
  technology: ["Algorithm", "Encryption", "Quantum", "Blockchain", "Interface", "Database"],
  philosophy: ["Existentialism", "Epistemology", "Nihilism", "Stoicism", "Metaphysics", "Ontology"],
  literature: ["Hamlet", "Odyssey", "Macbeth", "Inferno", "Ulysses", "ParadiseLost"],
};

const Hangman = () => {
  const [chosenWord, setChosenWord] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [dashes, setDashes] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // React Router navigation hook

  const maxGuesses = 6;

  const resetGame = () => {
    setChosenWord("");
    setWinCount(0);
    setCount(0);
    setCategory("");
    setIsGameOver(false);
    setIsWin(false);
    setDashes([]);
    setGuessedLetters([]);
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };

  const drawMan = (step) => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.strokeStyle = "#1c86ee"; // Change color to #1c86ee
      context.lineWidth = 2;

      const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
      };

      switch (step) {
        case 1:
          context.beginPath();
          context.arc(70, 30, 10, 0, Math.PI * 2, true);
          context.stroke();
          break;
        case 2:
          drawLine(70, 40, 70, 80);
          break;
        case 3:
          drawLine(70, 50, 50, 70);
          break;
        case 4:
          drawLine(70, 50, 90, 70);
          break;
        case 5:
          drawLine(70, 80, 50, 110);
          break;
        case 6:
          drawLine(70, 80, 90, 110);
          break;
        default:
          break;
      }
    }
  };

  const handleGuess = (letter) => {
    let updatedWinCount = winCount;
    let updatedCount = count;

    if (chosenWord.includes(letter)) {
      const newDashes = [...dashes];
      chosenWord.split("").forEach((char, index) => {
        if (char === letter) {
          newDashes[index] = letter;
          updatedWinCount += 1;
        }
      });
      setDashes(newDashes);
      setWinCount(updatedWinCount);
      if (updatedWinCount === chosenWord.length) {
        setIsWin(true);
        setIsGameOver(true);
      }
    } else {
      updatedCount += 1;
      setCount(updatedCount);
      drawMan(updatedCount);
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (updatedCount === maxGuesses) {
      setIsGameOver(true);
      setIsWin(false);
    }
  };

  const startGame = (selectedCategory) => {
    resetGame();
    setCategory(selectedCategory);
    const wordsArray = words[selectedCategory];
    const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
    setChosenWord(randomWord);
    setDashes(Array(randomWord.length).fill("_"));
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = "#1c86ee"; // Change the color of the initial drawing
    context.beginPath();
    context.moveTo(10, 130);
    context.lineTo(130, 130);
    context.moveTo(10, 10);
    context.lineTo(10, 131);
    context.moveTo(10, 10);
    context.lineTo(70, 10);
    context.moveTo(70, 10);
    context.lineTo(70, 20);
    context.stroke();
  }, [chosenWord]);

  return (
    <div className="containers">
      <div id="options-container">
        {!chosenWord && (
          <>
            <h3>Select An Option</h3>
            <div>
              {Object.keys(words).map((option) => (
                <button
                  key={option}
                  className={`options ${category === option ? "active" : ""}`}
                  onClick={() => startGame(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            
          </>
        )}
      </div>
      <div id="letter-container" className={`letter-container ${!chosenWord ? "hide" : ""}`}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            className={`letters ${guessedLetters.includes(letter) ? "disabled" : ""}`}
            disabled={isGameOver || guessedLetters.includes(letter)}
            onClick={() => handleGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div id="user-input-section">{dashes.map((dash, index) => <span key={index} className="dashes">{dash}</span>)}</div>
      <canvas id="canvas" ref={canvasRef} width="150" height="150"></canvas>
      {isGameOver && (
        <div id="new-game-container" className="new-game-popup">
          <div id="result-text">
            <h2 className={isWin ? 'win-msg' : 'lose-msg'}>{isWin ? 'You Win!!' : 'You Lose!!'}</h2>
            <p>The word was <span>{chosenWord}</span></p>
          </div>
          <button id="new-game-button" onClick={resetGame}>New Game</button>
          <button className="exit-button" onClick={() => navigate("/")}>Return to Home</button>
        </div>
      )}
    </div>
  );
};

export default Hangman;
