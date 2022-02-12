import React, { useState } from "react";

const InputArea = () => {
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState("");

  const handleInput = (e) => {
    if (e.target.value.includes(" ")) {
      e.target.value = e.target.value.replace(/\s/g, "");
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
        <button onClick={buttonClicked}>W</button>
      </form>
    </div>
  );
};

export default InputArea;
