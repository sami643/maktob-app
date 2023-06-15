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
import MaktobFormat from "./pages/maktob-format";
import PishnihadFormat from "./pages/pishnihad-format";
import IstehlaamFormat from "./pages/istehlam-format";
import Istehlaam from "./pages/istehlam";
import IstehlaamList from "./pages/istehlaam-list";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Maktob />} />
          <Route path="/main" element={<Maktob />} />
          <Route path="/maktob" element={<Maktob />} />
          <Route path="/maktoblist" element={<MaktobList />} />
          <Route path="/pishnihadlist" element={<PishnihadList />} />
          <Route path="/pishnihad" element={<Pishnihad />} />
          <Route path="/istehlaam" element={<Istehlaam />} />
          <Route path="/istehlaamlist" element={<IstehlaamList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/maktobview" element={<MaktobFormat />} />
          <Route path="/pishnihadview" element={<PishnihadFormat />} />
          <Route path="/istehlamview" element={<IstehlaamFormat />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
