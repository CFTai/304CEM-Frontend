import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Team from "./pages/Team";
import Home from './pages/Home';
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignupSuccess from "./pages/SignupSuccess";
import PrivatePage from "./PrivatePage";


import './styles/app.css';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index
           element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="product" element={<Product />} />
          <Route path="team" element={<Team />} />
          <Route path="signupSuccess" element={<SignupSuccess />} />
          {/* <ProtectedRoute path="profile" element={<Product />} />
           */}
          <Route exact path='profile' element={<PrivatePage Component={Profile}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;