import React, { useState } from "react";
import styled from "styled-components";
import DisplayGuess from "./DisplayGuess";
import { randomWord } from "../util/WordGenerator";

const InputField = styled.input`
  opacity: 0;
`;

const InputArea = (props) => {
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState([]);
  const [wrongAnimation, setWrongAnimation] = useState(false);
  const [colors, setColors] = useState([]);

  const handleInput = (e) => {
    if (e.target.value.match(/\W|\d/)) {
      e.target.value = e.target.value.replace(/\W|\d/g, "");
    }
    setInput(e.target.value);

    e.target.focus();
  };

  const reFocus = () => {
    const inputField = document.querySelector('input[name="wordle-input"]');
    inputField.focus();
  };

  const buttonClicked = (e) => {
    e.preventDefault();

    if (input.length < 5) {
      setInput(input + "w");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === 5) {
      setGuess([...guess, input]);
    }
  };

  const guessColors = () => {
    const colorArray = new Array(5);
    const tempInput = [...input.split("")];
    let tempWord = randomWord.split("");

    tempInput.forEach((letter, index) => {
      if (randomWord.charAt(index) === letter) {
        colorArray[index] = "#6aaa64";
        tempInput[index] = null;
        tempWord[index] = null;
      }
    });

    tempWord = tempWord.join("");

    tempInput.forEach((letter, index) => {
      if (letter) {
        if (tempWord.includes(letter)) {
          colorArray[index] = "#c9b458";
        } else {
          colorArray[index] = "#787c7e";
        }
      }
    });

    setColors([...colors, [...colorArray]]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      console.log("WORD: ", randomWord);

      if (input in props.dictionary) {
        document.querySelector("input[type='text']").disabled = true;
        guessColors();
        setInput("");
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.click();
      } else {
        setWrongAnimation(true);
      }
    }
  };

  return (
    <div>
      <DisplayGuess
        guess={guess}
        input={input}
        reFocus={reFocus}
        wrongAnimation={wrongAnimation}
        setWrongAnimation={setWrongAnimation}
        colors={colors}
      />
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="wordle-input"
          maxLength="5"
          value={input}
          onChange={handleInput}
          onBlur={reFocus}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
        />
        <button onClick={buttonClicked}>W</button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default InputArea;
