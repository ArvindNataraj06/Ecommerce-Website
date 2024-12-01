import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import ContextReducer from "./components/Context/ContextReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextReducer>
    <App />
  </ContextReducer>
);
