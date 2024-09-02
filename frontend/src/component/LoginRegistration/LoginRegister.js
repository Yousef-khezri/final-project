import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginRegister({ updateCheckLogin }) {
	const [isRegistering, setIsRegistering] = useState(false);
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const clickedLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/login", {
				email,
				password,
			});
			updateCheckLogin(response.data);
			//console.log(response.data); // test *******************************
			// navigate("/user-profile");
			navigate("/diamond-page");
		} catch (error) {
			console.log(error);
			setErrorMessage("Invalid email or password");
		}
	};

	const handleRegisterClick = () => {
		setIsRegistering(true);
		setErrorMessage("");
	};

	const handleLoginClick = () => {
		setIsRegistering(false);
		setErrorMessage("");
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/register",
				{
					username,
					email,
					password,
					phone_number: phone,
				}
			);
			setIsRegistering(false);
			setErrorMessage("");
			console.log(response.data.message);
		} catch (error) {
			console.error(error);
			setErrorMessage("Error registering user");
		}
	};

	return (
		<div className="bodyLoginRegister">
			<div className={`wrapper ${isRegistering ? "active" : ""}`}>
				<span className="box-icon-close">
					<i className="icon-close"></i>
				</span>

				<div className="form-box login">
					<h2>Login</h2>
					<form onSubmit={clickedLogin}>
						<div className="input-box input-box-email">
							<span className="icon">
								<i className="icon-email"></i>
							</span>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label>Email</label>
						</div>
						<div className="input-box">
							<span className="icon">
								<i className="icon-password"></i>
							</span>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label>Password</label>
						</div>

						<div className="remember-forget">
							<label>
								<input type="checkbox" />
								Remember me
							</label>
							<a href="#">Forget Password</a>
						</div>
						{errorMessage && (
							<p className="error">{errorMessage}</p>
						)}
						<button type="submit" className="btn-login">
							Login
						</button>
						<div className="login-register">
							<p>
								Don't have an account?
								<a
									href="#"
									className="register-link"
									onClick={handleRegisterClick}
								>
									Register
								</a>
							</p>
						</div>
					</form>
				</div>

				<div className="form-box register">
					<h2>Registration</h2>
					<form onSubmit={handleRegister}>
						<div className="input-box">
							<span className="icon">
								<i className="icon-user"></i>
							</span>
							<input
								type="text"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<label>Username</label>
						</div>
						<div className="input-box input-box-email">
							<span className="icon">
								<i className="icon-email"></i>
							</span>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label>Email</label>
						</div>
						<div className="input-box">
							<span className="icon">
								<i className="icon-password"></i>
							</span>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label>Password</label>
						</div>
						<div className="input-box">
							<span className="icon">
								<i className="icon-phone"></i>
							</span>
							<input
								type="text"
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
							<label>Phone</label>
						</div>

						<div className="remember-forget">
							<label>
								<input type="checkbox" />I agree to the terms &
								conditions
							</label>
						</div>
						{errorMessage && (
							<p className="error">{errorMessage}</p>
						)}
						<button type="submit" className="btn-login">
							Register
						</button>
						<div className="login-register">
							<p>
								Already have an account?
								<a
									href="#"
									className="login-link"
									onClick={handleLoginClick}
								>
									Login
								</a>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginRegister;
