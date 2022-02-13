import React, { useState } from "react";
import styled from "styled-components";

const GuessContainer = styled.div`
  margin: 0 auto;
  width: 500px;
  display: flex;
`;

const LetterContainer = styled.div`
  border: 5px solid black;
  margin: 5px 10px;
  padding: 10px;
`;

const InputArea = () => {
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState("");

  const handleInput = (e) => {
    if (e.target.value.match(/\W|\d/)) {
      e.target.value = e.target.value.replace(/\W|\d/g, "");
    }
    setInput(e.target.value);

    e.target.focus();
  };

  const reFocus = (e) => {
    const inputField = document.querySelector('input[name="wordle-input"]');
    inputField.focus();
  };

  const buttonClicked = (e) => {
    e.preventDefault();

    if (input.length < 5) {
      setInput(input + "w");
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="wordle-input"
          maxLength="5"
          value={input}
          onChange={handleInput}
          onBlur={reFocus}
          autoFocus
        />
        <GuessContainer>
          {input.split("").map((character, index) => {
            return <LetterContainer key={index}>{character}</LetterContainer>;
          })}
        </GuessContainer>
        <button onClick={buttonClicked}>W</button>
      </form>
    </div>
  );
};

export default InputArea;
