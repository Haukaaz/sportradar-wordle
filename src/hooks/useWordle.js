import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // tracks which turn user is on
  const [currentGuess, setCurrentGuess] = useState(""); // tracks what the user is currently typing in their current guess
  const [pastGuesses, setPastGuesses] = useState([...Array(5)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string, check for duplicate guesses
  const [isCorrect, setIsCorrect] = useState(false); // tracks the solution word compared to the guess
  const [usedKeys, setUsedKeys] = useState({}); // keeps track of what keys the user has tried guessing and their corrospondent color

  // format a guess into an array of letter objects
  // ex: [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      // l is the letter object, i is index
      if (l.key === solutionArray[i]) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });
    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setPastGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    // set state for history of previous guessed words
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    // add one to the turn state
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    // set the key to the corrospondent color based on the
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        // l is for letter object, each letter object already has a color from l.key
        const currentColor = newKeys[l.key];

        // For green we need to check if the color is strictly equal to green, This has top priority and will overwrite both yellow & grey
        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        // For yellow we need to check 2 conditions, to make sure it isn't already green and overwriting it
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        // We need 3 conditions for grey to prevent overwriting of both yellow & green
        if (
          l.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        alert(`You've already tried: ${currentGuess}`);
        setCurrentGuess("");
        return;
      }
      // check word is 5 characters long
      if (currentGuess.length !== 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    // Make Backspace work by slicing the state of currentGuess
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      // regex to only track a-z keys
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, pastGuesses, isCorrect, usedKeys, handleKeyUp };
};

export default useWordle;
