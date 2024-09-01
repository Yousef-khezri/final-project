import React, { useState, useEffect } from "react";
import "./Header.css";
import { Button } from "react-bootstrap";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

export default function Header({ checkLogin }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigateTo = useNavigate();

  const handelClickDiamond = () => {
    if(checkLogin === true){
      navigateTo('/diamond-page');
    }else{
      alert("Bitte melde dich ein!");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleClass = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header
      className={windowSize > 450 ? "header showWeb" : "header showHandy"}
    >
      {windowSize > 450 ? (
        <nav className="navbar">
          <div
            className="nav_link"
            onClick={navigateTo('/')}
          >
            Home
          </div>
          <div
            className="nav_link"
            onClick={navigateTo('/about-us')}
          >
            About us
          </div>
          <div
            className="nav_link"
            onClick={handelClickDiamond}
          >
            Diamond
          </div>
          <div
            className="nav_link"
            
          >
            Our Team
          </div>
          <a
            className="nav_link"
            
          >
            Contact
          </a>
          {!checkLogin ? (
            <a
            className="nav_link"
            href="/login-register"
            target="_blank"
          >
            Signin/Signup
          </a>
          ) : (
            <a
            className="nav_link"
            href="http://localhost:5000/logout"
            target="_blank"
          >
            Logout
          </a>
          )}
        </nav>
      ) : (
        <div className="toggleBox">
         <DropDown />
        </div>
      )}
    </header>
  );
}
