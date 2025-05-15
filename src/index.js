import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import App from "./components/App";
import "./styles.css";

ReactDOM.render(
    <BrowserRouter basename="/react-kit-collective">
        <App />
    </BrowserRouter>, document.getElementById("root"));
