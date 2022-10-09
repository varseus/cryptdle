import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "./styles/App.css";
import Play from "./pages/Play.js";
import Intro from "./pages/Intro.js";

/**
 * Handles navigation using react-router-dom
 */
function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
        <Routes>
            <Route index element={<Intro/>} />
            <Route path={"/play"} element={<Play/>} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;