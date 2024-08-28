import React, { useEffect, useState } from "react";
// import axios from "axios";
import Sidebar from "../../Chat/Web/ComponentsChat/Sidebar";
import UserProfile_Main from "./component/UserProfile_Main";
import Avatar_Upload_Popup from "./component/Avatar_Upload_Popup";
import "./UserProfile_Web.css";

export default function UserProfile_Web(
	currentUser,
	currentUserProfile,
	setCurrentUserProfile
) {
	// const [userId] = useState(currentUser.user_id); // user id testing ***************
	// const [profile, setProfile] = useState(null);

	const [showPopup, setShowPopup] = useState(false);

	const handleAvatarClick = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	if (!currentUserProfile) {
		return <div>Loading...</div>;
	}

	return (
		<div className="userProfile_web">
			{/* //header */}
			<Sidebar
				currentUserProfile={currentUserProfile}
				handleAvatarClick={handleAvatarClick}
			/>
			<UserProfile_Main
				currentUserProfile={currentUserProfile}
				setCurrentUserProfile={setCurrentUserProfile}
				handleAvatarClick={handleAvatarClick}
			/>
			<Avatar_Upload_Popup
				currentUserProfile={currentUserProfile}
				setCurrentUserProfile={setCurrentUserProfile}
				showPopup={showPopup}
				closePopup={closePopup}
			/>
			{/* //footer */}
		</div>
	);
}
