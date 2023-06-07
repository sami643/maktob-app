import React, { useState } from "react";
import {
  FaBars,
  FaUserAlt,
  FaSignOutAlt,
  FaBookOpen,
  FaThList,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/main",
      name: "مکتوب",
      icon: <FaBookOpen />,
    },
    {
      path: "/maktoblist",
      name: "د مکتوبونو ټولګه",
      icon: <FaThList />,
    },
    {
      path: "/pishnihad",
      name: "پیشنهاد",
      icon: <FaBookOpen />,
    },
    {
      path: "/pishnihadlist",
      name: "د پیشنهادونو ټولګه",
      icon: <FaThList />,
    },
    {
      path: "/profile",
      name: "پروفایل",
      icon: <FaUserAlt />,
    },
    {
      path: "/productList",
      name: "وتل",
      icon: <FaSignOutAlt />,
    },
  ];

  const [login, setLogin] = useState(true);
  return (
    <>
      {login ? (
        <div className="container-1">
          <div style={{ width: isOpen ? "200px" : "60px" }} className="sidebar">
            <div className="top_section">
              <h1
                style={{
                  display: isOpen ? "block" : "none",
                  marginLeft: "50px",
                }}
                className="logo"
              >
                TVETA
              </h1>
              <div
                style={{ marginLeft: isOpen ? "50px" : "0px" }}
                className="bars"
              >
                <FaBars onClick={toggle} />
              </div>
            </div>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
                style={{ textDecoration: "none" }}
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
          <main>{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};

export default Sidebar;
