import React, { useEffect } from "react";
import "./App.css";
import words from "./data/five-character-words.txt";
import InputArea from "./component/InputArea";

function App() {
  const getText = async (file) => {
    const response = await fetch(file);
    try {
      const text = await response.text();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
  useEffect(() => {
    getText(words);
  }, []);
  return (
    <div className="App">
      <InputArea />
    </div>
  );
}

export default App;
