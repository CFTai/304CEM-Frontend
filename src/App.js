import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Team from "./pages/Team";
import Home from './pages/Home';
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import './styles/app.css';
import PrivatePage from "./PrivatePage";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index
           element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="product" element={<Product />} />
          <Route path="team" element={<Team />} />
          {/* <ProtectedRoute path="profile" element={<Product />} />
           */}
          <Route exact path='profile' element={<PrivatePage Component={Profile}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;