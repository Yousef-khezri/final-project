import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./component/Home/Home";
import LoginRegister from "./component/LoginRegistration/LoginRegister";
import Notfound from "./component/Notfound";
import Chat from "./component/Chat/Chat";
import UserProfile from "./component/UserProfile/UserProfile";
import Diamond from "./component/Diamond/Diamond";

function App() {
  const [checkLogin, setCheckLogin] = useState(false);

  const updateCheckLogin = () => {
	setCheckLogin(true);
  };

	return (
		<div className="App">
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={<Home checkLogin={checkLogin} />}
						// handy < 350 px  < web
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
					<Route path="/chat" element={<Chat />} />
					<Route path="/user-profile" element={<UserProfile />} />
					{/* <Route
						path="/details-user/:username"
						element={<DetailsUser setUser={setUser} user={user} />}
					/> */}
					<Route path="/*" element={<Notfound />} />
				</Routes>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default App;
