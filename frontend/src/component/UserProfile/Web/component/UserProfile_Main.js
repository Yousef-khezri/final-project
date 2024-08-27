import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile_Main.css";
import My_profile from "./My_profile";
import Interests from "./Interests";
import Photos from "./Photos";
import Hobbies from "./Hobbies";
import PhotoUploadPopup from "./PhotoUploadPopup";

function UserProfile_Main({ profile, setProfile, handleAvatarClick }) {
	const [user_id] = useState(1);
	const [photos, setPhotos] = useState(null);
	const [activeTab, setActiveTab] = useState("My profile");

	//--------------------------------------------------------------------------
	//                checking for friend request
	//--------------------------------------------------------------------------
	const [friendRequest, setFriendRequest] = useState();

	const [receiver_id] = useState(3); // for testing purposes ******

	useEffect(() => {
		// درخواست به بک‌اند برای گرفتن وضعیت درخواست دوستی
		const fetchFriendRequestStatus = async () => {
			try {
				const response = await fetch(
					// `http://localhost:5000/friend-request-status?sender_id=${user_id}&receiver_id=${profile.user_id}`
					`http://localhost:5000/friend-request-status?sender_id=${user_id}&receiver_id=${receiver_id}`
				);
				const data = await response.json();

				if (data && data.status) {
					setFriendRequest(data.status);
				} else {
					setFriendRequest("rejected"); // اگر داده‌ای موجود نبود، به عنوان rejected در نظر گرفته می‌شود
				}
			} catch (error) {
				console.error("Error fetching friend request status:", error);
				setFriendRequest("rejected"); // در صورت وجود خطا، به عنوان rejected در نظر گرفته می‌شود
			}
		};

		fetchFriendRequestStatus();
	}, [user_id, receiver_id]);    // orginal : receiver_id => profile.user_id  ********

	// تعیین تصویر بر اساس وضعیت
	const getImageSrc = () => {
		if (friendRequest) {
			switch (friendRequest.status) {
				case "pending":
					return "./images/heart-red.png";
				case "accepted":
					return "./images/heart-accepted.png";
				case "rejected":
				default:
					return "./images/heart.png";
			}
		} else {
			return "./images/heart.png";
		}
	};

	// --- testing ---
	useEffect(() => {
		console.log(friendRequest);
	}, [friendRequest]);
	//--------------------------------------------------------------------------
	//                ending friend request
	//--------------------------------------------------------------------------

	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};

	//------- upload photos --------------------------------------------------------
	const [showPopup, setShowPopup] = useState(false);
	const openPopup = () => setShowPopup(true);
	const closePopup = () => setShowPopup(false);
	//------------------------------------------------------------------------------
	//  Get photos user
	useEffect(() => {
		if (user_id) {
			axios
				.get(`http://localhost:5000/photos/${user_id}`)
				.then((res) => {
					setPhotos(res.data);
				})
				.catch((err) => {
					console.error("Error fetching photos:", err);
				});
		}
	}, [user_id]);

	//------------------------------------------------------------------------------
	// یک تابع برای مدیریت خطا در بارگذاری تصویر
	const handleImageError = (e) => {
		e.target.src = "./images/user.png"; // تنظیم مسیر پیش‌فرض تصویر
	};

	return (
		<div className="user-profile">
			<div className="header">
				<div className="user-info">
					<img
						src={`http://localhost:5000${profile.profile_picture_url}`}
						alt="User Avatar"
						className="avatar"
						// key={profile.user_id}
					/>
					<p className="user-name">
						{profile.first_name} {profile.last_name},{" "}
						{new Date().getFullYear() -
							new Date(profile.birthdate).getFullYear()}
					</p>
					<img
						className="img_send_request"
						key={profile.user_id}
						src={getImageSrc()}
						alt="Friend Request Status"
					/>
				</div>
			</div>

			<div className="tabs_images">
				{photos ? (
					<>
						{/*  ---------------------------------------------------------  */}
						{photos[0] && photos[0].photo_url ? ( // بررسی وجود photo_url
							<img
								src={`http://localhost:5000/images/${photos[0].photo_url}`}
								alt="User Avatar"
								className="image-user"
								onError={handleImageError}
							/>
						) : (
							<img
								src="./images/user.png"
								alt="Default User Avatar"
								className="image-user"
							/>
						)}
						{/*  ---------------------------------------------------------  */}
						{photos[1] && photos[1].photo_url ? (
							<img
								src={`http://localhost:5000/images/${photos[1].photo_url}`}
								alt="User Avatar"
								className="image-user"
								onError={handleImageError}
							/>
						) : (
							<img
								src="./images/user.png"
								alt="Default User Avatar"
								className="image-user"
							/>
						)}
						{/*  ---------------------------------------------------------  */}
						{photos[2] && photos[2].photo_url ? (
							<img
								src={`http://localhost:5000/images/${photos[2].photo_url}`}
								alt="User Avatar"
								className="image-user"
								onError={handleImageError}
							/>
						) : (
							<img
								src="./images/user.png"
								alt="Default User Avatar"
								className="image-user"
							/>
						)}
					</>
				) : null}

				{/* ------------------ upload photo ---------------------------- */}
				<img
					src="./images/upload-image.png"
					alt="Upload User Image"
					className="upload-image-user"
					onClick={openPopup}
				/>
				<PhotoUploadPopup
					showPopup={showPopup}
					closePopup={closePopup}
					setPhotos={setPhotos}
				/>
				{/* ------------------------------------------------------------ */}
			</div>

			<div className="tabs">
				<div
					className={`tab ${
						activeTab === "My profile" ? "active" : ""
					}`}
					onClick={() => handleTabClick("My profile")}
				>
					Profile
				</div>
				<div
					className={`tab ${
						activeTab === "Interests" ? "active" : ""
					}`}
					onClick={() => handleTabClick("Interests")}
				>
					Interests
				</div>
				<div
					className={`tab ${activeTab === "Hobbies" ? "active" : ""}`}
					onClick={() => handleTabClick("Hobbies")}
				>
					Hobbies
				</div>
				<div
					className={`tab ${activeTab === "Photos" ? "active" : ""}`}
					onClick={() => handleTabClick("Photos")}
				>
					Photos
				</div>
			</div>

			<div className="profile-content">
				{activeTab === "My profile" && (
					<My_profile
						profile={profile}
						setProfile={setProfile}
						handleAvatarClick={handleAvatarClick}
					/>
				)}
				{activeTab === "Interests" && <Interests />}
				{activeTab === "Hobbies" && <Hobbies />}
				{activeTab === "Photos" && (
					<Photos photos={photos} setPhotos={setPhotos} />
				)}
			</div>
		</div>
	);
}

export default UserProfile_Main;
