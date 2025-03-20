import React from "react";
import Row from "../row/Row";

export default function Grid({ currentGuess, pastGuesses, turn }) {
  return (
    <div>
      {pastGuesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} pastGuess={g} />;
      })}
    </div>
  );
}
