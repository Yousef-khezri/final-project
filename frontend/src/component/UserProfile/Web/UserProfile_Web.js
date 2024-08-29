import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Chat/Web/ComponentsChat/Sidebar";
import UserProfile_Main from "./component/UserProfile_Main";
import Avatar_Upload_Popup from "./component/Avatar_Upload_Popup";
import "./UserProfile_Web.css";

export default function UserProfile_Web({
	currentUser,
	setCurrentUser,
	// currentUserProfile,
	// setCurrentUserProfile,
	selectedUser,
}) {
	// const [userId] = useState(currentUser.user_id); // user id testing ***************
	// const [profile, setProfile] = useState(null);
	const [error, setError] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleAvatarClick = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	console.log(currentUser);

	// if (!currentUserProfile) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div className="userProfile_web">
			{/* //header */}
			<Sidebar
				currentUser={currentUser}
				// currentUserProfile={currentUserProfile}
				handleAvatarClick={handleAvatarClick}
			/>
			<UserProfile_Main
				currentUser={currentUser}
				// currentUserProfile={currentUserProfile}
				// setCurrentUserProfile={setCurrentUserProfile}
				handleAvatarClick={handleAvatarClick}
				selectedUser={selectedUser}
			/>
			<Avatar_Upload_Popup
				// currentUserProfile={currentUserProfile}
				// setCurrentUserProfile={setCurrentUserProfile}
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				showPopup={showPopup}
				closePopup={closePopup}
			/>
			{/* //footer */}
		</div>
	);
}
