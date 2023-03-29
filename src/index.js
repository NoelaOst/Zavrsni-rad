import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Chat from "./components/Chat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route
          path="/Chat"
          element={
            <div>
              <Chat />
            </div>
          }
        >
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
