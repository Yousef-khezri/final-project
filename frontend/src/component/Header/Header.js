import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import DropDown from "./DropDown";

export default function Header({ checkLogin }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);

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
					<a
						className="nav_link"
						href="../src/componente/Home/Home.js"
						target="_blank"
					>
						Home
					</a>
					<a
						className="nav_link"
						href="../src/componente/Home/Home.js"
						target="_blank"
					>
						About us
					</a>
					<a
						className="nav_link"
						href="../src/componente/Home/Home.js"
						target="_blank"
					>
						Galery
					</a>
					<a
						className="nav_link"
						href="../src/componente/Home/Home.js"
						target="_blank"
					>
						Our Team
					</a>
					<a
						className="nav_link"
						href="../src/componente/Home/Home.js"
						target="_blank"
					>
						Contact
					</a>
					{!checkLogin ? (
						<Link
							className="nav_link"
							to="/login-register"
						>
							Signin/Signup
						</Link>
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
