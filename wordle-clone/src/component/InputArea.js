import React, { useState } from "react";
import styled from "styled-components";
import DisplayGuess from "./displayGuess";

const InputField = styled.input`
  opacity: 0;
`;

const InputArea = (props) => {
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState([]);
  const [animate, setAnimation] = useState("");

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (input in props.dictionary) {
        document.querySelector("input[type='text']").disabled = true;
        setInput("");
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.click();
        setAnimation("right");
      } else {
        setAnimation("wrong");
      }
    }
  };

  return (
    <div>
      <DisplayGuess
        guess={guess}
        input={input}
        reFocus={reFocus}
        animate={animate}
        setAnimation={setAnimation}
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
