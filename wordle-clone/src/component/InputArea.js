import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const GuessContainer = styled.div`
  margin: 0 auto;
  width: 500px;
  display: flex;
`;

const InputField = styled.input`
  opacity: 0;
`;

const WrongAnswerAnimation = keyframes`
  0%{
    transform: translate(-2%);
  }

  25%{
    transform: translate(4%);
  }

  50%{
    transform: translate(-4%);
  }

  100%{
    transform: translate(2%);
  }
`;

const LetterContainer = styled.div`
  border: 5px solid black;
  margin: 5px 10px;
  padding: 10px;
  font-size: 2rem;
  text-transform: uppercase;
  min-width: 2rem;
  animation: ${(props) =>
      props.canAnimate && props.animate ? WrongAnswerAnimation : "none"}
    0.2s;
`;

const InputArea = (props) => {
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState([]);
  const [animate, setAnimate] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === 5) {
      setGuess([...guess, input]);
    }
  };

  const handleKeyDown = (e) => {
    console.log("KEY: ", e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      setAnimate(true);
      setInput("");
      const submitButton = document.querySelector('button[type="submit"]');
      submitButton.click();
    }
  };

  return (
    <div>
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
        {guess.map((word, guessIndex) => {
          return (
            <GuessContainer key={guessIndex}>
              {word.split("").map((character, index) => {
                return (
                  <LetterContainer
                    key={index}
                    onAnimationStart={() =>
                      (document.querySelector(
                        "input[type='text']"
                      ).disabled = true)
                    }
                    onAnimationEnd={() => {
                      setAnimate(false);
                      setTimeout(function () {
                        document.querySelector(
                          "input[type='text']"
                        ).disabled = false;
                        reFocus();
                      }, 300);
                    }}
                    animate={animate}
                    canAnimate={guessIndex + 1 === guess.length}
                  >
                    {character}
                  </LetterContainer>
                );
              })}
            </GuessContainer>
          );
        })}
        <GuessContainer>
          {input.split("").map((character, index) => {
            return <LetterContainer key={index}>{character}</LetterContainer>;
          })}
        </GuessContainer>
        <button onClick={buttonClicked}>W</button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default InputArea;
