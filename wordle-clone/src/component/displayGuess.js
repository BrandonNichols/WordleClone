import React from "react";
import styled, { keyframes } from "styled-components";
import Letter from "./Letter";

const GuessContainer = styled.div`
  margin: 0 auto;
  width: 500px;
  display: flex;
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
`;

const DisplayGuess = (props) => {
  const DURATION = 300;

  const letterAnimationSquish = (e, canAnimate, animationDelay) => {
    if (canAnimate) {
      const nextLetter = e.nextElementSibling;
      if (nextLetter) {
        nextLetter.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0)" },
            { transform: "scaleY(1)" }
          ],
          { duration: DURATION, delay: animationDelay }
        );

        letterAnimationSquish(
          nextLetter,
          canAnimate,
          animationDelay + DURATION
        );
      }
    }
  };

  return (
    <>
      {props.guess.map((word, guessIndex) => {
        return (
          <GuessContainer key={guessIndex}>
            {word.split("").map((character, index) => {
              return (
                <Letter
                  key={index}
                  animationStart={letterAnimationSquish}
                  timeOut={1100}
                  reFocus={props.reFocus}
                  animate={props.animate && index === 0 ? "right" : "none"}
                  currentGuess={false}
                  canAnimate={guessIndex + 1 === props.guess.length}
                  duration={DURATION}
                  character={character}
                  setAnimation={props.setAnimation}
                />
              );
            })}
          </GuessContainer>
        );
      })}
      <GuessContainer>
        {props.input.split("").map((character, index) => {
          return (
            <Letter
              key={index}
              animationStart={() =>
                (document.querySelector("input[type='text']").disabled = true)
              }
              timeOut={300}
              reFocus={props.reFocus}
              animate={props.animate}
              currentGuess={true}
              canAnimate={false}
              duration={200}
              character={character}
              setAnimation={props.setAnimation}
            />
          );
        })}
      </GuessContainer>
    </>
  );
};

export default DisplayGuess;
