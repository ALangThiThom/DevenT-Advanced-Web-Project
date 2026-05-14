import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // <-- Import CSS của Bootstrap vào đây
import { BrowserRouter } from "react-router-dom"; // <-- 1. Import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* <-- 2. Bọc App bên trong BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
