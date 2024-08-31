import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Sidebar from "../../Chat/Web/ComponentsChat/Sidebar";
import UserProfile_Main from "./component/UserProfile_Main";
import Avatar_Upload_Popup from "./component/Avatar_Upload_Popup";
import "./UserProfile_Web.css";

export default function UserProfile_Web({
	currentUser,
	setCurrentUser,
	receiver_id,
	setReceiver_id,
	checkLogin,
}) {
	const [showPopup, setShowPopup] = useState(false);

	const handleAvatarClick = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className="userProfile_web">
			<Header checkLogin={checkLogin} />
			<div className="body_userProfile_web">
				<Sidebar
					currentUser={currentUser}
					handleAvatarClick={handleAvatarClick}
					setReceiver_id={setReceiver_id}
				/>
				<UserProfile_Main
					currentUser={currentUser}
					handleAvatarClick={handleAvatarClick}
					receiver_id={receiver_id}
					setReceiver_id={setReceiver_id}
				/>
				<Avatar_Upload_Popup
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					showPopup={showPopup}
					closePopup={closePopup}
				/>
			</div>
			{/* //footer */}
		</div>
	);
}
