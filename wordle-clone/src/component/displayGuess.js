import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import DisplayGrid from "./DisplayGrid";

const DisplayArea = styled.div`
  position: relative;
  margin: 0 auto;
  width: 500px;
`;

const GuessContainer = styled.div`
  margin: 0 auto;
  width: 67%;
  display: flex;
  font-size: 2rem;
  font-weight: bold;
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

const RightAnswerAnimation = (backGroundColor, color) => keyframes`
  0%{
    transform: scaleY(1);
    background-color: white;
  }

  50%{
    transform: scaleY(0);
    background-color: white;
  }

  100%{
    transform: scaleY(1);
    background-color: ${backGroundColor};
    color: ${color};
  }
`;

const RightAnswerContainer = styled.div`
  background-color: white;
  color: black;
  margin: 3px 3.5px 3.5px;
  padding: 10px;
  text-transform: uppercase;
  min-width: 2.5rem;
  animation-name: ${(props) =>
    RightAnswerAnimation(props.backGroundColor, props.color)};
  animation-duration: ${(props) => props.duration}ms;
  animation-delay: ${(props) => props.delay}ms;
  animation-fill-mode: forwards;
`;

const WrongAnswerContainer = styled(RightAnswerContainer)`
  animation-name: ${(props) =>
    props.wrongAnimation ? WrongAnswerAnimation : "none"};
  animation-delay: 0s;
`;

const DisplayGuess = (props) => {
  const DURATION_RIGHT = 300;
  const DURATION_WRONG = 200;
  const delay = useRef(0);

  return (
    <DisplayArea>
      <DisplayGrid />
      {props.guess.map((word, guessIndex) => {
        delay.current = -DURATION_RIGHT;
        return (
          <GuessContainer key={guessIndex}>
            {word.split("").map((character, index) => {
              delay.current = delay.current + DURATION_RIGHT;
              return (
                <RightAnswerContainer
                  key={index}
                  onAnimationEnd={() => {
                    setTimeout(function () {
                      document.querySelector(
                        "input[type='text']"
                      ).disabled = false;
                      props.reFocus();
                    }, 1100);
                  }}
                  duration={DURATION_RIGHT}
                  delay={delay.current}
                  backGroundColor={props.colors[guessIndex][index]}
                  color="white"
                >
                  {character}
                </RightAnswerContainer>
              );
            })}
          </GuessContainer>
        );
      })}
      <GuessContainer>
        {props.input.split("").map((character, index) => {
          return (
            <WrongAnswerContainer
              key={index}
              onAnimationEnd={() => {
                setTimeout(function () {
                  props.setWrongAnimation(false);
                  document.querySelector("input[type='text']").disabled = false;
                  props.reFocus();
                }, 300);
              }}
              duration={DURATION_WRONG}
              wrongAnimation={props.wrongAnimation}
            >
              {character}
            </WrongAnswerContainer>
          );
        })}
      </GuessContainer>
    </DisplayArea>
  );
};

export default DisplayGuess;
