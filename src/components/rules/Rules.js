import React from "react";
import "./rules.css";
import Example_1 from "../../assets/rule-example-1.png";
import Example_2 from "../../assets/rule-example-2.png";
import Example_3 from "../../assets/rule-example-3.png";

export default function Rules({ setShowRules }) {
  return (
    <div className="modal">
      <div className="rules-container">
        <div className="rules-headings">
          <h1 className="mainheading">How To Play</h1>
          <p className="subheading">Guess the Wordle in 5 tries.</p>
        </div>
        <div>
          <li>Each guess must be a 5 letter word.</li>
          <li>
            The color of the tiles will change to show how close you are to the
            word.
          </li>
          <li>You cannot guess the same word twice.</li>
        </div>
        <p className="subheading">Examples</p>
        <div className="example-container">
          <img src={Example_1} alt="example1" />
          <p>
            <b>W</b> is in the word and in the correct spot.
          </p>
        </div>
        <div className="example-container">
          <img src={Example_2} alt="example2" />
          <p>
            <b>I</b> is in the word but in the wrong spot.
          </p>
        </div>
        <div className="example-container">
          <img src={Example_3} alt="example3" />
          <p>
            <b>U</b> is not in the word in any spot.
          </p>
        </div>
        <button className="btn" onClick={() => setShowRules(false)}>
          PLAY
        </button>
      </div>
    </div>
  );
}
