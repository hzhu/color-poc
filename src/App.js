import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CustomColorPicker from "./CustomColorPicker";

const defaultRGB = { r: 180, g: 218, b: 85, a: 1 };
const defaultHEX = "#b4da55";

function App() {
  const [color, setColor] = React.useState(defaultRGB);
  return (
    <div className="App">
      <CustomColorPicker
        color={color}
        onChange={(data, event) => {
          console.log(data);
          setColor(data.rgb);
        }}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
