import React from "react";
import UserProfile_Web from "./Web/UserProfile_Web";
import "./UserProfile.css";

export default function UserProfile({
	currentUser,
	setCurrentUser,
	receiver_id,
	setReceiver_id,
	checkLogin,
}) {
	return (
		<div className="userProfile">
			<UserProfile_Web
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				receiver_id={receiver_id}
				setReceiver_id={setReceiver_id}
				checkLogin={checkLogin}
			/>
		</div>
	);
}
