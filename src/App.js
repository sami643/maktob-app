import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Maktob from "./pages/maktob.jsx";
import MaktobList from "./pages/maktob-list";
import Pishnihad from "./pages/pishnihad.jsx";
import PishnihadList from "./pages/pishnihad-list.jsx";
import Profile from "./pages/profile.jsx";
import LogOut from "./pages/no-page-found.jsx";
import Login from "./pages/login.jsx";
import MaktobFormat from "./pages/maktob-format";
import PishnihadFormat from "./pages/pishnihad-format";
import IstehlaamFormat from "./pages/istehlam-format";
import Istehlaam from "./pages/istehlam";
import IstehlaamList from "./pages/istehlaam-list";
import Dashboard from "./pages/dashboard";
import { UserContext } from "./context/userContext";
import Application from "./context/application";

import { Auth } from "./context/authentication";
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user ? <Auth /> : <Application />}
    </UserContext.Provider>
  );
};

export default App;
