import React from "react";
import "./modal.css";

export default function Modal({ isCorrect, turn, solution }) {
  const PlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className="modal">
      {isCorrect && (
        <div className="modal-container">
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses</p>
          <button onClick={PlayAgain} className="btn play-again-btn">
            Play Again
          </button>
        </div>
      )}
      {!isCorrect && (
        <div className="modal-container">
          <h1>So Close!</h1>
          <p className="solution red">
            <span>The Word was:</span>
            {solution}
          </p>
          <button onClick={PlayAgain} className="btn play-again-btn">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
