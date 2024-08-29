import React, { useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ currentUser, handleAvatarClick, closePopup }) => {
	console.log(currentUser);

	useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

	return (
		<div className="sidebar">
			<div className="logo">
				<img className="img-logo" src="./images/logo.png" />
			</div>
			<div className="profile">
				<img
					className="img-profile-user"
					onClick={handleAvatarClick}
					src={
						currentUser.profile_picture_url
							? `http://localhost:5000${currentUser.profile_picture_url}`
							: "./images/user.png"
					}
				/>
				<h3>
					{currentUser.first_name && currentUser.last_name
						? `${currentUser.first_name} ${currentUser.last_name}`
						: currentUser.username}
				</h3>
			</div>
			<div className="menu">
				<div className="menu-item">
					<img className="icons" src="./images/msg.png" />
					<div className="menu-chat">Chat</div>
				</div>
				<div className="menu-item">
					<img className="icons" src="./images/heart.png" />
					<div className="menu-like">Like</div>
				</div>
				<div className="menu-item">
					<img className="icons" src="./images/question-mark.png" />
					<div className="menu-text1">Text1</div>
				</div>
				<div className="menu-item">
					<img className="icons" src="./images/question-mark.png" />
					<div className="menu-text2">Text2</div>
				</div>
				<div className="vip-section">VIP</div>
			</div>
			<div className="user-list">
				<div className="user">
					<img className="img-profile-user" src="./images/user.png" />
					<span>Svetlana, 26</span>
				</div>
				<div className="user">
					<span>Hannah, 29</span>
					<img className="img-profile-user" src="./images/user.png" />
				</div>
				<div className="user">
					<img className="img-profile-user" src="./images/user.png" />
					<span>Anna, 31</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
