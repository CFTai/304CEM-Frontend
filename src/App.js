import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Team from "./pages/Team";
import Home from './pages/Home';
import './styles/app.css';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index
           element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop />} />
          <Route path="team" element={<Team />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;