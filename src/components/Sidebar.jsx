import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

import "./components-style.css";
import { NavLink } from "react-router-dom";
import { sidebarMenuItem } from "./../assets/data/data.js";
import { useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const { setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();
  // const [isSidebarVisible, setIsSidebarVisible] = useState(
  //   shouldSidebarBeVisible(location.pathname)
  // );
  const [isScrolled, setIsScrolled] = useState(false);
  // useEffect(() => {
  //   setIsSidebarVisible(shouldSidebarBeVisible(location.pathname));
  // }, [location]);
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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleConfirm = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    // setShowConfirmation(false);
  };
  const handleCancel = () => {
    // Handle cancellation or closing the confirmation message
    console.log("Cancelled");
    // TODO: Add your logic here

    // Close the confirmation message
    setShowConfirmation(false);
  };

  const openConfirmation = () => {
    // Open the confirmation message
    setShowConfirmation(true);
  };

  return (
    <>
      <div className="container-1">
        <div style={{ width: isOpen ? "180px" : "60px" }} className="sidebar ">
          <div
            className={`top_section bg-primary ${isScrolled ? "scrolled" : ""}`}
          >
            <h2
              style={{
                display: isOpen ? "block" : "none",
                marginLeft: "50px",
              }}
              className="sidebarlogo"
            >
              TVETA
            </h2>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              {isOpen ? (
                <AiOutlineMenuUnfold onClick={toggle} />
              ) : (
                <AiOutlineMenuFold onClick={toggle} />
              )}
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
          <a
            onClick={openConfirmation}
            className="link "
            activeclassName="active"
          >
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              وتل
            </div>
          </a>
        </div>

        <main>
          <>
            {showConfirmation && (
              <>
                <div className="confirmation-modal">
                  <p>وتل/ خروج</p>
                  <div className="button-container">
                    <button
                      className="cancel-button bg-primary"
                      onClick={handleCancel}
                    >
                      نه/نخیر
                    </button>
                    <button
                      className="confirm-button bg-primary"
                      onClick={handleConfirm}
                    >
                      هو/ بلی
                    </button>
                  </div>
                </div>
                <div className="backDrop_div"></div>
              </>
            )}
            {children}
          
          </>{" "}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
