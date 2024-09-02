import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
import DropDown from "./DropDown";

export default function Header({ checkLogin }) {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const [showNavbar, setShowNavbar] = useState(false);

	const navigate = useNavigate();

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

	// <Route path="/Contact" element={<Contact />} />
	// <Route path="/AboutUs" element={<AboutUs />} />
	// <Route path="/OurTeam" element={<OurTeam />} />
	//----------------------------------------------------------------
	const clickedHome = () => {
		navigate("/");
	};
	//----------------------------------------------------------------
	const clickedAboutUs = () => {
		navigate("/AboutUs");
	};
	//----------------------------------------------------------------
	const clickedOurTeam = () => {
		navigate("/OurTeam");
	};
	//----------------------------------------------------------------
	const clickedContact = () => {
		navigate("/Contact");
	};
	//----------------------------------------------------------------

	return (
		<header
			className={windowSize > 450 ? "header showWeb" : "header showHandy"}
		>
			{windowSize > 450 ? (
				<nav className="navbar">
					<div className="nav_link" onClick={clickedHome}>
						Home
					</div>
					<div className="nav_link" onClick={clickedAboutUs}>
						About us
					</div>
					<div className="nav_link" onClick={clickedOurTeam}>
						Our Team
					</div>
					<div className="nav_link" onClick={clickedContact}>
						Contact
					</div>
					{!checkLogin ? (
						<Link className="nav_link" to="/login-register">
							Signin/Signup
						</Link>
					) : (
						<div className="nav_link">Logout</div>
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
