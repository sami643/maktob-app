import Login from "../pages/login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Auth = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
