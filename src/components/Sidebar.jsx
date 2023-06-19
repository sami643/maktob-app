import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "./components-style.css";
import { NavLink } from "react-router-dom";
import { sidebarMenuItem } from "./../assets/data/data.js";
import { useLocation } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();

  const shouldSidebarBeVisible = (pathname) => {
    if (pathname === "/login") {
      // THIS IS TRUE TEMPORARILY
      return false;
    }
    return true;
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    shouldSidebarBeVisible(location.pathname)
  );
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setIsSidebarVisible(shouldSidebarBeVisible(location.pathname));
  }, [location]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const shouldChangeColor = scrollTop > 0; // Change this condition as needed

      setIsScrolled(shouldChangeColor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isSidebarVisible ? (
        <div className="container-1">
          <div style={{ width: isOpen ? "200px" : "60px" }} className="sidebar">
            <div className={`top_section ${isScrolled ? "scrolled" : ""}`}>
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
            {sidebarMenuItem.map((item, index) => (
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
