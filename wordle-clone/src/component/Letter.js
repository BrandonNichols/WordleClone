import React from "react";
import styled, { keyframes } from "styled-components";

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
    transform: scaleY(1);
  }

  50%{
    transform: scaleY(0);
  }

  100%{
    transform: scaleY(1);
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

const Letter = (props) => {
  return (
    <LetterContainer
      onAnimationStart={(e) => {
        props.animationStart(e.target, props.canAnimate, props.duration);
      }}
      onAnimationEnd={() => {
        props.setAnimation("");
        setTimeout(function () {
          document.querySelector("input[type='text']").disabled = false;
          props.reFocus();
        }, props.timeOut);
      }}
      animate={props.animate}
      currentGuess={props.currentGuess}
      canAnimate={props.canAnimate}
      duration={`${props.duration}ms`}
    >
      {props.character}
    </LetterContainer>
  );
};

export default Letter;
