import React, { useState, useEffect } from 'react';


const Game = () => {
  // State variables
  const [keywordBox, setKeywordBox] = useState(null); // Position of the keyword
  const [score, setScore] = useState(0); // User's score
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [timeLeft, setTimeLeft] = useState(60); // Time left in the game (in seconds)
  
  const boxes = Array(9).fill(false); // 3x3 grid of 9 boxes
  
  useEffect(() => {
    // Start the game logic
    if (gameOver) return;

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setGameOver(true); // End the game when time is up
        clearInterval(timer); // Stop the timer
      }
    }, 1000); // Update the timer every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft, gameOver]);

  // Function to handle keyword appearance and disappear logic
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // Choose a random box for the keyword
      const randomBox = Math.floor(Math.random() * 9);
      setKeywordBox(randomBox);
    }, 2000); // Show keyword every 2 seconds for 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [gameOver]);

  // Function to handle the click event on a box
  const handleClick = (index) => {
    if (gameOver) return;

    if (index === keywordBox) {
      setScore(score + 5); // Correct click
    } else {
      setScore(score - 2.5); // Incorrect click
    }

    // Hide the keyword after a click
    setKeywordBox(null);
  };

  return (
    <div className="game-container">
      {!gameOver ? (
        <>
          <div className="score">
            <h3>Score: {score.toFixed(2)}</h3>
            <h3>Time Left: {timeLeft} seconds</h3>
          </div>
          <div className="grid">
            {boxes.map((_, index) => (
              <div
                key={index}
                className={`box ${keywordBox === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
              >
                {keywordBox === index && <span>HIT</span>}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="game-over">
          <h1>Game Over</h1>
          <h2>Your Final Score: {score.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Game;
