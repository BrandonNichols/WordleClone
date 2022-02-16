import React from "react";
import "./App.css";
import InputArea from "./component/InputArea";
import { data } from "./data/data";

function App() {
  return (
    <div className="App">
      <InputArea dictionary={data} />
    </div>
  );
}

export default App;
