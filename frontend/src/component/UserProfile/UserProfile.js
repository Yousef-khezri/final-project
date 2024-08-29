import { useEffect, useState } from "react";
// import axios from "axios";
import UserProfile_Web from "./Web/UserProfile_Web";
import "./UserProfile.css";

export default function UserProfile({ currentUser, setCurrentUser, selectedUser }) {
	// const [currentUserProfile, setCurrentUserProfile] = useState([]);

	// const [error, setError] = useState("");

	// useEffect(() => {
	// 	// Fetch user profile when component mounts
	// 	const fetchUserProfile = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"http://localhost:5000/profile",
	// 				{
	// 					params: {
	// 						user_id: currentUser.user_id, // ارسال user_id به عنوان پارامتر
	// 					},
	// 				}
	// 			);
	// 			setCurrentUserProfile(response.data);
	// 		} catch (err) {
	// 			if (err.response && err.response.data) {
	// 				setError(err.response.data.message);
	// 			} else {
	// 				setError("An error occurred while fetching the profile.");
	// 			}
	// 		}
	// 	};

	// 	fetchUserProfile();
	// }, []);

	// ************ >>  testing  << ***************
	// useEffect(() => {

	// console.log(currentUserProfile);
	// console.log(currentUser);
	// }, [currentUserProfile, currentUser]);
	// ********************************************

	return (
		<div className="userProfile">
			<UserProfile_Web
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				// currentUserProfile={currentUserProfile}
				// setCurrentUserProfile={setCurrentUserProfile}
				selectedUser={selectedUser}
			/>
		</div>
	);
}
