import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>

  );
}

export default App;
