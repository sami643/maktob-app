import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
};

export default LogOut;
