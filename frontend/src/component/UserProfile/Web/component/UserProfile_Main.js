import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile_Main.css";
import My_profile from "./My_profile";
import Interests from "./Interests";
import Photos from "./Photos";
import Hobbies from "./Hobbies";
import PhotoUploadPopup from "./PhotoUploadPopup";

function UserProfile_Main({
	currentUser,
	// currentUserProfile,
	setCurrentUserProfile,
	handleAvatarClick,
	receiver_id,
	setReceiver_id,
}) {
	// console.log("currentUser:", currentUser.user_id);
	const [user_id] = useState(currentUser.user_id);

	const [photos, setPhotos] = useState(null);
	const [activeTab, setActiveTab] = useState("My profile");
	const [profileToDisplay, setProfileToDisplay] = useState(null);
	const [error, setError] = useState("");
	const [showChat, setShowChat] = useState("pending");

	//const [receiver_id, setReceiver_id] = useState(5); // for testing purposes @@@@@@@@@@@

	// const updateShowChat = (item) => {

	// };

	//----------------------------------------------------------------
	//         check status friend request
	const getStatus = async () => {
		if (!user_id || !receiver_id) {
			return null;
		}
		try {
			const response = await axios.get(
				"http://localhost:5000/friend-request-status",
				{
					params: {
						sender_id: user_id,
						receiver_id: receiver_id,
					},
				}
			);

			setShowChat(response.data[0].status);

			// console.log("response.data.status =" + response.data[0].status);
			setError("");
		} catch (err) {
			setError("Failed to fetch the status");
			setShowChat("pending");
		}

		// if (showChat === undefined) {
		// 	setShowChat("accepted");
		// }
	};

	useEffect(() => {
		if (user_id === receiver_id) {
			setShowChat("pending");
		} else {
			getStatus();
		}
	}, [receiver_id]);

	// useEffect(() => {
	// 	console.log("^^^^^^^^^^^^^^^^^^^^^^");
	// 	console.log("ShowChat : ", showChat);
	// 	console.log("user_id : ", user_id );
	// 	console.log("receiver_id : ", receiver_id );
	// 	console.log("-----------------------");

	// }, [showChat]);
	//----------------------------------------------------------------

	useEffect(() => {
		// if (user_id !== receiver_id) {
		// Fetch user profile when component mounts
		if (receiver_id) {
			const fetchUserProfile = async () => {
				try {
					const response = await axios.get(
						"http://localhost:5000/profile",
						{
							params: {
								user_id: receiver_id, // ارسال user_id به عنوان پارامتر
							},
						}
					);
					setProfileToDisplay(response.data);
				} catch (err) {
					if (err.response && err.response.data) {
						setError(err.response.data.message);
					} else {
						setError(
							"An error occurred while fetching the profile."
						);
					}
				}
			};

			fetchUserProfile();
		}
		// } else {
		// 	setProfileToDisplay(currentUserProfile);
		// }
	}, [receiver_id]);

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//                  tester
	// useEffect(() => {
	// console.log("user_id : ");
	// console.log(user_id);
	// console.log("receiver_id : " + receiver_id);
	// console.log("currentUserProfile :");
	// console.log(currentUserProfile);
	// console.log("profileToDisplay :");
	// console.log(profileToDisplay);
	// }, [currentUserProfile]);
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	//*********************************************************************** */
	//                checking for friend request
	//--------------------------------------------------------------------------
	const [friendRequest, setFriendRequest] = useState(null);

	//----------------------------------------
	//          Get friend request status
	const fetchFriendRequestStatus = async () => {
		if (!user_id || !receiver_id) {
			return null;
		}
		try {
			const response = await axios.get(
				`http://localhost:5000/friend-request-status`,
				{
					params: {
						sender_id: user_id,
						receiver_id: receiver_id,
					},
				}
			);

			const data = response.data; // دریافت داده‌ها از پاسخ

			if (data) {
				// بررسی اینکه داده‌ای موجود است
				setFriendRequest(data);
			} else {
				setFriendRequest({ status: "rejected" }); // اگر هیچ داده‌ای موجود نبود
			}
		} catch (error) {
			// console.error("Error fetching friend request status:", error);
			setFriendRequest({ status: "rejected" });
		}
	};

	// استفاده از تابع درون useEffect
	useEffect(() => {
		fetchFriendRequestStatus();
	}, [user_id, receiver_id]);

	//-------------------------------------------------------------------------
	//    Set image for friend request status
	const getImageSrc = () => {
		// Get Status for show icon chat
		getStatus();

		// بررسی می‌کنیم که آیا friendRequest یک آرایه است و حداقل یک عنصر دارد
		if (Array.isArray(friendRequest) && friendRequest.length > 0) {
			// پیدا کردن درخواست ارسال‌شده از user_id
			const userRequest = friendRequest.find(
				(request) =>
					request.sender_id === user_id &&
					request.receiver_id === receiver_id
			);

			// اگر درخواست ارسال‌شده از سمت user_id موجود باشد
			if (userRequest) {
				if (userRequest.status === "accepted") {
					return "./images/heart-accepted.png";
				} else if (userRequest.status === "pending") {
					return "./images/heart-red.png";
				} else if (userRequest.status === "rejected") {
					return "./images/heart.png";
				}
			}

			// updateShowChat(userRequest.status);

			// اگر درخواست ارسال‌شده از سمت user_id وجود نداشته باشد، وضعیت پیش‌فرض
			return "./images/heart.png";
		} else {
			// اگر friendRequest آرایه‌ای از درخواست‌ها نباشد یا خالی باشد
			return "./images/heart.png";
		}
		// setShowChat(new_Status);
	};

	//---------------------------------------------
	//        Update friend request status
	// تابع برای مدیریت کلیک روی تصویر

	const handleFriendRequestClick = async () => {
		try {
			let newStatus;
			/*
			friendRequest = [
				{
					id: 3,
					receiver_id: 5,
					sender_id: 1,
					sent_at: "2024-08-27T14:06:14.000Z",
					status: "rejected"
				},
				{
					id: 3,
					receiver_id: 1,
					sender_id: 5,
					sent_at: "2024-08-27T18:06:57.000Z",
					status: "pending"
				}
			];
			*/

			//@@@@@@@@@ => new code <= @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
			// اگر درخواست‌های دوستی موجود باشد
			if (Array.isArray(friendRequest) && friendRequest.length > 0) {
				// پیدا کردن درخواست دوستی مرتبط با user_id و receiver_id
				let existingRequest = friendRequest.find(
					(request) =>
						(request.sender_id === user_id &&
							request.receiver_id === receiver_id) ||
						(request.sender_id === receiver_id &&
							request.receiver_id === user_id)
				);

				let receiver_status_rejected = true;

				if (Array.isArray(friendRequest) && friendRequest.length > 1) {
					// پیدا کردن ایندکس آبجکت‌هایی که شرایط مشخص شده را دارند
					const index_obj_sender = friendRequest.findIndex(
						(request) =>
							request.sender_id === user_id &&
							request.receiver_id === receiver_id
					);

					const index_obj_receiver = friendRequest.findIndex(
						(request) =>
							request.sender_id === receiver_id &&
							request.receiver_id === user_id
					);

					if (
						friendRequest[index_obj_receiver].status !== "rejected"
					) {
						receiver_status_rejected = false;
					}

					existingRequest = friendRequest[index_obj_sender];

					// console.log("index_obj_sender : " + index_obj_sender);
					// console.log("index_obj_receiver : " + index_obj_receiver);
					// console.log(
					// 	"receiver_status_rejected : " + receiver_status_rejected
					// );
				}

				// console.log(existingRequest);

				if (existingRequest) {
					if (existingRequest.sender_id === user_id) {
						// درخواست از سمت user_id به receiver_id ارسال شده است
						if (
							existingRequest.status === "pending" &&
							receiver_status_rejected
						) {
							newStatus = "rejected"; // اگر وضعیت فعلی "pending" است و درخواست توسط user_id ارسال شده، باید رد شود
						} else if (existingRequest.status === "accepted") {
							newStatus = "rejected"; // اگر وضعیت فعلی "accepted" است، باید به "rejected" تغییر کند
						} else if (
							existingRequest.status === "rejected" &&
							receiver_status_rejected
						) {
							newStatus = "pending"; // اگر وضعیت فعلی "rejected" است، باید به "pending" برگردد
						} else {
							newStatus = "accepted"; // اگر وضعیت فعلی "rejected" است، باید به "pending" برگردد
						}
					} else if (existingRequest.sender_id === receiver_id) {
						// درخواست از سمت receiver_id به user_id ارسال شده است
						if (existingRequest.status === "pending") {
							newStatus = "accepted"; // اگر وضعیت فعلی "pending" است و درخواست از سمت receiver_id به user_id ارسال شده، باید پذیرفته شود
						} else if (existingRequest.status === "rejected") {
							newStatus = "pending"; // اگر وضعیت فعلی "rejected" است، باید به "pending" برگردد
						} else if (existingRequest.status === "accepted") {
							newStatus = "rejected"; // اگر وضعیت فعلی "accepted" است، باید به "rejected" تغییر کند
						}
					}
				} else {
					// اگر هیچ درخواست مرتبطی پیدا نشد، وضعیت پیش‌فرض "pending" خواهد بود
					newStatus = "pending";
				}
			} else {
				// اگر هیچ درخواست دوستی موجود نباشد
				newStatus = "pending"; // وضعیت پیش‌فرض
			}

			// updateShowChat(newStatus);

			const response = await axios.post(
				"http://localhost:5000/update-friend-request-status",
				{
					sender_id: user_id,
					receiver_id: receiver_id,
					action: newStatus,
				}
			);

			// console.log("newStatus : ", newStatus);
			fetchFriendRequestStatus();
		} catch (error) {
			console.error("Error updating friend request status:", error);
		}

		getStatus();
	};
	//----------------------

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// --- testing ---
	// useEffect(() => {
	// console.log(friendRequest);
	// console.log("sender_id: ", user_id);
	// console.log("receiver_id: ", receiver_id);
	// console.log(`showChat: ${showChat}`);
	// }, [friendRequest]);
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	//--------------------------------------------------------------------------
	//                ending friend request
	//*********************************************************************** */

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
		if (receiver_id) {
			axios
				.get(`http://localhost:5000/photos/${receiver_id}`)
				.then((res) => {
					setPhotos(res.data);
				})
				.catch((err) => {
					console.error("Error fetching photos:", err);
				});
		}
	}, [receiver_id]);

	//------------------------------------------------------------------------------
	// یک تابع برای مدیریت خطا در بارگذاری تصویر
	const handleImageError = (e) => {
		e.target.src = "./images/user.png"; // تنظیم مسیر پیش‌فرض تصویر
	};

	return (
		<div className="user-profile">
			{profileToDisplay != null ? (
				<>
					<div className="header">
						<div className="user-info">
							<img
								src={
									profileToDisplay.profile_picture_url
										? `http://localhost:5000${profileToDisplay.profile_picture_url}`
										: "./images/user.png"
								}
								alt="User Avatar"
								className="avatar"
								// key={profile.user_id}
							/>
							<p className="user-name">
								{profileToDisplay.first_name &&
								profileToDisplay.last_name
									? `${profileToDisplay.first_name} ${profileToDisplay.last_name}`
									: profileToDisplay.username}
								,{" "}
								{new Date().getFullYear() -
									new Date(
										profileToDisplay.birthdate
									).getFullYear()}
							</p>
							<div className="box_icon_chat">
								{showChat === "accepted" ? (
									<div>
										<Link className="nav_link" to="/chat">
											<img
												className="icon_chat"
												src="./images/msg.png"
											/>
										</Link>
									</div>
								) : null}
							</div>
							{user_id !== receiver_id ? (
								<img
									className="img_send_request"
									key={receiver_id}
									src={getImageSrc()}
									alt="Friend Request Status"
									onClick={handleFriendRequestClick}
								/>
							) : null}
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
						{user_id === receiver_id ? (
							<img
								src="./images/upload-image.png"
								alt="Upload User Image"
								className="upload-image-user"
								onClick={openPopup}
							/>
						) : null}
						<PhotoUploadPopup
							receiver_id={receiver_id}
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
							className={`tab ${
								activeTab === "Hobbies" ? "active" : ""
							}`}
							onClick={() => handleTabClick("Hobbies")}
						>
							Hobbies
						</div>
						<div
							className={`tab ${
								activeTab === "Photos" ? "active" : ""
							}`}
							onClick={() => handleTabClick("Photos")}
						>
							Photos
						</div>
					</div>

					<div className="profile-content">
						{activeTab === "My profile" && (
							<My_profile
								user_id={user_id}
								receiver_id={receiver_id}
								profileToDisplay={profileToDisplay}
								setProfileToDisplay={setProfileToDisplay}
								// setCurrentUserProfile={setCurrentUserProfile}
								handleAvatarClick={handleAvatarClick}
							/>
						)}
						{activeTab === "Interests" && (
							<Interests
								user_id={user_id}
								receiver_id={receiver_id}
							/>
						)}
						{activeTab === "Hobbies" && (
							<Hobbies
								user_id={user_id}
								receiver_id={receiver_id}
							/>
						)}
						{activeTab === "Photos" && (
							<Photos
								user_id={user_id}
								receiver_id={receiver_id}
								photos={photos}
								setPhotos={setPhotos}
							/>
						)}
						{/* photos, setPhotos */}
					</div>
				</>
			) : null}
		</div>
	);
}

export default UserProfile_Main;
