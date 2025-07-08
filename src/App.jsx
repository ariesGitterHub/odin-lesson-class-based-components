// import { useState } from "react";
import "./App.css";
import FunctionalInput from "./components-functional/FunctionalInput";
import ClassInput from "./components-class-based/ClassInput";

function App() {
  return (
    <>
      <div className="app-container">
        <h1>Function vs Class-based Components</h1>
        <FunctionalInput name="Functional Input Example" />
        <ClassInput name="Class-based Input Example" />
      </div>
    </>
  );
}

export default App;
