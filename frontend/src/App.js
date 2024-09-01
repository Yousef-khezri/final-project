import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./component/Home/Home";
import LoginRegister from "./component/LoginRegistration/LoginRegister";
import Notfound from "./component/Notfound";
import Chat from "./component/Chat/Chat";
import UserProfile from "./component/UserProfile/UserProfile";
import Diamond from "./component/Diamond/Diamond";
// import ModalSearch from "./component/Search/ModalSearch";

function App() {
	const [checkLogin, setCheckLogin] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [receiver_id, setReceiver_id] = useState(0);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);

	const updateCheckLogin = (user) => {
		setCheckLogin(true);
		setCurrentUser(user);
	};

	//----------------------------------------------------------------

	// useEffect(() => {
	// 	if (checkLogin === false) { return;}
	// 		// درخواست برای دریافت اطلاعات کاربر
	// 		axios
	// 			.get("http://localhost:5000/api/current-user")
	// 			.then((response) => {
	// 				console.log(response.data);
	// 				setCurrentUser(response.data);
	// 				// setLoading(false);
	// 			})
	// 			.catch((err) => {
	// 				setError(err.message);
	// 				// setLoading(false);
	// 			});
	// }, [checkLogin]);
	//----------------------------------------------------------------

	
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// useEffect(() => {
	// 	console.log("currentUser ==>");
	// 	console.log(currentUser);
	// 	console.log("receiver_id ==>" + receiver_id);
	// }, [receiver_id, currentUser]);
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	return (
		<div className="App">
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={<Home checkLogin={checkLogin} />}
					/>
					<Route path="/diamond-page" element={<Diamond />} />
					<Route
						path="/login-register"
						element={
							<LoginRegister
								updateCheckLogin={updateCheckLogin}
							/>
						}
					/>
					<Route
						path="/chat"
						element={
							<Chat
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								receiver_id={receiver_id}
								setReceiver_id={setReceiver_id}
								checkLogin={checkLogin}
							/>
						}
					/>
					<Route
						path="/user-profile"
						element={
							<UserProfile
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								receiver_id={receiver_id}
								setReceiver_id={setReceiver_id}
								checkLogin={checkLogin}
							/>
						}
					/>
					<Route path="/*" element={<Notfound />} />
				</Routes>
			</div>
		</div>
	);
}
export default App;
