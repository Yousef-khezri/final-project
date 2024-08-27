import "./Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({
	checkLogin
}) {
	const navigate = useNavigate();

	const handleLoginRegisterClick = () => {
		navigate("/login-register");
	};

	return (
		<div className="page">
			{!checkLogin ? (
				<div className="home_Page">
					<div className="header_HomePage">
						<div className="Logo">
							<h1>Dating Web</h1>
						</div>
						<button
							className="btn_LoginRegister"
							onClick={handleLoginRegisterClick}
						>
							Login/Register
						</button>
					</div>
					<div className="main_HomePage">
						<div className="boxTitle">
							<h1>Welcome</h1>
							<h1>To Dating web</h1>
							<h1>Please register an account</h1>
						</div>
					</div>
				</div>
			) : (
				<div className="homePageAccount">
					<h1>Welcome user...</h1>
				</div>
			)}
		</div>
	);
}
