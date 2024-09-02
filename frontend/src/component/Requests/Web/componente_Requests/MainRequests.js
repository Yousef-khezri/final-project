import React, { useState, useEffect } from "react";
import "./MainRequests.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	getImageSrc,
	handleFriendRequestClick,
} from "../../../function_Friend_request";

function MainRequests({ currentUser, setReceiver_id }) {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const [usersProfile, setUsersProfile] = useState([]);
	const [imageSrcs, setImageSrcs] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		// ارسال درخواست به بک‌اند برای دریافت درخواست‌های دریافتی که وضعیت آنها 'accepted' نیست
		Axios.get(
			`http://localhost:5000/user-profiles/received-requests/${currentUser.user_id}`
		)
			.then((response) => {
				setUsersProfile(response.data);
				// تابع loadImages برای بارگذاری تصاویر (در صورت نیاز) به اینجا اضافه کنید
				loadImages(response.data);
			})
			.catch((error) => {
				console.error("Error fetching user received-requests:", error);
				// setError(error);
			});
	}, []);

	useEffect(() => {
		console.log(usersProfile);
	}, [usersProfile]);

	useEffect(() => {
		// getProfileData();
		const handleResize = () => {
			setWindowSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	//------------------------------------------------------------------------------
	//                handele Click Send Request

	const handeleClick_SendRequest = async (receiverId) => {
		const newStatus = await handleFriendRequestClick(
			currentUser.user_id,
			receiverId
		);

		console.log("New Status => " + newStatus);

		if (newStatus) {
			setUsersProfile((prevProfiles) => {
				const updatedProfiles = prevProfiles.map((profile) => {
					if (
						profile.user_id === receiverId &&
						newStatus === "accepted"
					) {
						return { ...profile, status: newStatus };
					}
					return profile;
				});
				loadImages(updatedProfiles); // به‌روزرسانی تصاویر @@@@@@@@@@
				return updatedProfiles;
			});
		}
	};
	//------------------------------------------------------------------------------
	//                cliked user =>  show user profile
	const handeleClick_ShowUserProfile = (item_user_id) => {
		setReceiver_id(item_user_id);
		navigate("/user-profile");
	};
	//------------------------------------------------------------------------------
	//     update img request friend
	const loadImages = async (profiles) => {
		const newImageSrcs = {};
		for (const profile of profiles) {
			const src = await getImageSrc(currentUser.user_id, profile.user_id);
			newImageSrcs[profile.user_id] = src;
		}
		setImageSrcs(newImageSrcs);
	};

	//------------------------------------------------------------------------------

	return (
		<main className="main">
			{usersProfile
				? usersProfile.map((item, index) => {
						// const imageSrc = getImageSrc(
						// 	currentUser.user_id,
						// 	item.user_id
						// );
						return (
							<div
								className={
									windowSize > 1200
										? "diamond_mainBox_big"
										: "diamond_mainBox_small"
								}
								key={item.user_id}
							>
								<div
									className={
										windowSize > 1200
											? "imageDivBig"
											: "imageDivSmall"
									}
								>
									<img
										onClick={() => {
											handeleClick_ShowUserProfile(
												item.user_id
											);
										}}
										src={
											item.profile_picture_url
												? `http://localhost:5000${item.profile_picture_url}`
												: "./images/user.png"
										}
									/>
									<div className="img_text">
										<div
											onClick={() => {
												handeleClick_SendRequest(
													item.user_id
												);
											}}
										>
											<img
												// className="leerH"
												className="img_send_request"
												key={item.user_id}
												src={
													imageSrcs[item.user_id] ||
													"./images/heart.png"
												}
												alt="Request Status"
											/>
										</div>
										<div
											onClick={() => {
												handeleClick_ShowUserProfile(
													item.user_id
												);
											}}
										>
											<div>
												<label>{item.first_name}</label>{" "}
												<label>{item.last_name}</label>,
												<label>{item.location}</label>
											</div>
											<p>
												{new Date().getFullYear() -
													new Date(
														item.birthdate
													).getFullYear()}
											</p>
										</div>
									</div>
								</div>
								{/* right box */}
								{windowSize > 1200 ? (
									<div
										className="userInfo_div"
										onClick={() => {
											handeleClick_ShowUserProfile(
												item.user_id
											);
										}}
									>
										<div className="above_line">
											<label>{item.first_name}</label>{" "}
											<label>{item.last_name}</label>
										</div>
										<hr />
										<div className="under_line">
											<img src="./icons/locationDiamond.png" />
											<label>{item.location}</label>
										</div>
										<div className="under_line">
											<img src="./icons/kalendarDiamond.png" />
											<label>
												{new Date().getFullYear() -
													new Date(
														item.birthdate
													).getFullYear()}
												<label> Jahre alt</label>
											</label>
										</div>
										<div className="under_line">
											<img src="./icons/genderDiamond.png" />
											<label> {item.gender}</label>
										</div>
									</div>
								) : null}
							</div>
						);
				  })
				: "Loading..."}
		</main>
	);
}

export default MainRequests;
