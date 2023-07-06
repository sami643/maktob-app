import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import Maktob from "../pages/maktob.jsx";
import MaktobList from "../pages/maktob-list.jsx";
import Pishnihad from "../pages/pishnihad.jsx";
import PishnihadList from "../pages/pishnihad-list.jsx";
import Profile from "../pages/profile.jsx";
import LogOut from "../pages/no-page-found.jsx";
import Login from "../pages/login.jsx";
import MaktobFormat from "../pages/maktob-format";
import PishnihadFormat from "../pages/pishnihad-format";
import IstehlaamFormat from "../pages/istehlam-format";
import Istehlaam from "../pages/istehlam";
import IstehlaamList from "../pages/istehlaam-list";
import Dashboard from "../pages/dashboard";

export default function Application() {
  useEffect(() => {
    console.log("applicatnioen oinnder biod");
  }, []);
  // localStorage.clear();
  return (
    // <Sidebar>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/maktob" element={<Maktob />} />
        <Route path="/maktob/:maktobId" element={<Maktob />} />
        <Route path="/maktoblist" element={<MaktobList />} />
        <Route path="/pishnihadlist" element={<PishnihadList />} />
        <Route path="/pishnihad" element={<Pishnihad />} />
        <Route path="/istehlaam" element={<Istehlaam />} />
        <Route path="/istehlaamlist" element={<IstehlaamList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/maktobview" element={<MaktobFormat />} />
        <Route path="/pishnihadview" element={<PishnihadFormat />} />
        <Route path="/istehlamview" element={<IstehlaamFormat />} />
      </Routes>
    </BrowserRouter>
    // </Sidebar>
  );
}
