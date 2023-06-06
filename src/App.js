import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Maktob from "./pages/maktob.jsx";
import MaktobList from "./pages/maktob-list";
import Pishnihad from "./pages/pishnihad.jsx";
import PishnihadList from "./pages/pishnihad-list.jsx";
import Profile from "./pages/profile.jsx";
import LogOut from "./pages/logout.jsx";
import Login from "./pages/login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/main" element={<Maktob />} />
          <Route path="/maktob" element={<Maktob />} />
          <Route path="/maktoblist" element={<MaktobList />} />
          <Route path="/pishnihadlist" element={<PishnihadList />} />
          <Route path="/pishnihad" element={<Pishnihad />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productList" element={<LogOut />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
