import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Chat/Web/ComponentsChat/Sidebar";
import UserProfile_Main from "./component/UserProfile_Main";
import Avatar_Upload_Popup from "./component/Avatar_Upload_Popup";
import "./UserProfile_Web.css";

export default function UserProfile_Web() {
	const [userId] = useState(1); // user id testing ***************
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleAvatarClick = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	useEffect(() => {
		// Fetch user profile when component mounts
		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/profile",
					{
						params: {
							user_id: userId, // ارسال user_id به عنوان پارامتر
						},
					}
				);
				setProfile(response.data);
			} catch (err) {
				if (err.response && err.response.data) {
					setError(err.response.data.message);
				} else {
					setError("An error occurred while fetching the profile.");
				}
			}
		};

		fetchUserProfile();
	}, [userId]);

	if (error) {
		return <div>{error}</div>;
	}

	if (!profile) {
		return <div>Loading...</div>;
	} else {
		console.log(profile);
	}

	return (
		<div className="userProfile_web">
			{/* //header */}
			<Sidebar profile={profile} handleAvatarClick={handleAvatarClick} />
			<UserProfile_Main
				profile={profile}
				setProfile={setProfile}
				handleAvatarClick={handleAvatarClick}
			/>
			<Avatar_Upload_Popup
				profile={profile}
				setProfile={setProfile}
				showPopup={showPopup}
				closePopup={closePopup}
			/>
			{/* //footer */}
		</div>
	);
}
