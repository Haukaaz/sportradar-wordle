import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./grid/Grid";
import Keypad from "./keypad/Keypad";
import Modal from "./modal/Modal";
import Rules from "./rules/Rules";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, pastGuesses, isCorrect, turn, usedKeys } =
    useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    /* Ending the game */
    // Condition 1: If user guesses the word correctly, win
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    // Condition 2: When the turns are over 5, loss
    if (turn > 4) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  return (
    <>
      {showRules ? <Rules setShowRules={setShowRules} /> : null}
      <button className="btn rules-btn" onClick={() => setShowRules(true)}>
        RULES
      </button>
      <Grid currentGuess={currentGuess} pastGuesses={pastGuesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
}
