import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import Maktob from "../pages/maktob.jsx";
import MaktobList from "../pages/maktob-list.jsx";
import Pishnihad from "../pages/pishnihad.jsx";
import PishnihadList from "../pages/pishnihad-list.jsx";
import Profile from "../pages/profile.jsx";
import Istehlaam from "../pages/istehlam";
import IstehlaamList from "../pages/istehlaam-list";
import Dashboard from "../pages/dashboard";
import PageNotFound from "../pages/no-page-found";
import ReceivedMaktobList from "../pages/received-maktoblist";
import SignUp from "../pages/sign-up.jsx";

export default function Application() {
  return (
    // <Sidebar>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/maktob" element={<Maktob />} />
        <Route path="/maktob/:maktobId" element={<Maktob />} />
        <Route path="/istehlaam/:istehlaamId" element={<Istehlaam />} />
        <Route path="/maktoblist" element={<MaktobList />} />
        <Route path="/received-maktoblist" element={<ReceivedMaktobList />} />
        <Route path="/pishnihadlist" element={<PishnihadList />} />
        <Route path="/pishnihad" element={<Pishnihad />} />
        <Route path="/pishnihad/:pishnihadId" element={<Pishnihad />} />
        <Route path="/istehlaam" element={<Istehlaam />} />
        <Route path="/istehlaamlist" element={<IstehlaamList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    // </Sidebar>
  );
}
