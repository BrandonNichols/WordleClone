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

const RightAnswerAnimation = keyframes`
  0%{
    transform: scaleY(1)
  }

  50%{
    transform: scaleY(0)
  }

  100%{
    transform: scaleY(1)
  }
`;

const LetterContainer = styled.div`
  border: 5px solid black;
  margin: 5px 10px;
  padding: 10px;
  font-size: 2rem;
  text-transform: uppercase;
  min-width: 2rem;
  animation-name: ${(props) => {
    switch (props.animate) {
      case "wrong":
        if (props.currentGuess) {
          return WrongAnswerAnimation;
        } else {
          return "none";
        }
      case "right":
        if (props.canAnimate) {
          return RightAnswerAnimation;
        } else {
          return "none";
        }
      default:
        return "none";
    }
  }};
  animation-duration: ${(props) => props.duration};
  animation-delay: ${(props) => props.delay};
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
    if (e.key === "Enter") {
      e.preventDefault();

      if (input in props.dictionary) {
        setInput("");
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.click();
        setAnimation("right");
      } else {
        setAnimation("wrong");
      }
    }
  };

  const letterAnimationEnd = (e, canAnimate, animationDelay) => {
    if (canAnimate) {
      setTimeout(function () {
        document.querySelector("input[type='text']").disabled = false;
        reFocus();
      }, 300);

      const nextLetter = e.nextElementSibling;
      if (nextLetter) {
        nextLetter.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0)" },
            { transform: "scaleY(1)" }
          ],
          { duration: 1000, delay: animationDelay }
        );

        letterAnimationEnd(nextLetter, canAnimate, animationDelay + 1000);
      }
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
                    onAnimationStart={(e) => {
                      document.querySelector(
                        "input[type='text']"
                      ).disabled = true;

                      letterAnimationEnd(
                        e.target,
                        guessIndex + 1 === guess.length,
                        1000
                      );
                    }}
                    animate={animate && index === 0 ? "right" : "none"}
                    currentGuess={false}
                    canAnimate={guessIndex + 1 === guess.length}
                    duration="1s"
                    delay="1s"
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
            return (
              <LetterContainer
                key={index}
                onAnimationStart={() =>
                  (document.querySelector("input[type='text']").disabled = true)
                }
                onAnimationEnd={() => {
                  setAnimation("");
                  setTimeout(function () {
                    document.querySelector(
                      "input[type='text']"
                    ).disabled = false;
                    reFocus();
                  }, 300);
                }}
                animate={animate}
                currentGuess={true}
                duration="0.2s"
                delay="0s"
              >
                {character}
              </LetterContainer>
            );
          })}
        </GuessContainer>
        <button onClick={buttonClicked}>W</button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default InputArea;
