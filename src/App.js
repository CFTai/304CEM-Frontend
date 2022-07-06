import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from './pages/Navbar';
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Team from "./pages/Team";
import HomePage from './components/homePage';
import './styles/app.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop />} />
          <Route path="team" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;