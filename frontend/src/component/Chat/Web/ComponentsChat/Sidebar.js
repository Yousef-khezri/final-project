import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ currentUser, handleAvatarClick, setReceiver_id }) => {
	// console.log(currentUser);

	// useEffect(() => {
	// 	console.log(currentUser);
	// }, [currentUser]);

	const clickedUser = (id) => {
		setReceiver_id(id);
	};

	// const handleLinkClick = (event) => {
	// 	event.stopPropagation();
	// };

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
				<div
					key={currentUser.id}
					onClick={() => clickedUser(currentUser.id)}
				>
					<Link className="nav_link" to="/user-profile">
						<h3>
							{currentUser.first_name && currentUser.last_name
								? `${currentUser.first_name} ${currentUser.last_name}`
								: currentUser.username}
						</h3>
					</Link>
				</div>
			</div>
			<div className="menu">
				<div className="menu-item">
					<Link className="nav_link" to="/chat">
						<img className="icons" src="./images/msg.png" />
						<div className="menu-chat">Chat</div>
					</Link>
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
			{/* -------------------------------------------------------------------- */}
			{/*                         Suggested users                              */}
			{/* -------------------------------------------------------------------- */}
			<div className="user-list">
				<div className="user" key={1} onClick={() => clickedUser(1)}>
					<img className="img-profile-user" src="./images/user.png" />
					<Link className="nav_link" to="/user-profile">
						<span>Svetlana, 26</span>
					</Link>
				</div>
				<div className="user" key={2} onClick={() => clickedUser(3)}>
					<Link className="nav_link" to="/user-profile">
						<span>Hannah, 29</span>
					</Link>
					<img className="img-profile-user" src="./images/user.png" />
				</div>
				<div className="user" onClick={() => clickedUser(5)}>
					<img className="img-profile-user" src="./images/user.png" />
					<Link className="nav_link" to="/user-profile">
						<span>Anna, 31</span>
					</Link>
				</div>
			</div>
			{/* -------------------------------------------------------------------- */}
		</div>
	);
};

export default Sidebar;
