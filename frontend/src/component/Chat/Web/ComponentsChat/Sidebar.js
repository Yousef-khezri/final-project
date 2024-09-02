import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ currentUser, handleAvatarClick, setReceiver_id }) => {
	const navigate = useNavigate();
	// console.log(currentUser);

	// useEffect(() => {
	// 	console.log(currentUser);
	// }, [currentUser]);

	const clickedUser = (id) => {
		// console.log("id => " + id);
		setReceiver_id(id);
	};

	//----------------------------------------------------------------
	// when clicked button chat
	const clickStartChat = () => {
		setReceiver_id(0); // اجرای تابع دلخواه شما
	};
	//----------------------------------------------------------------
	//     clicked Diamond
	const clickedDiamond = () => {
		navigate("/diamond-page");
	};
	//----------------------------------------------------------------
	//       /received-requests
	//     clicked Diamond
	const clickedRequests = () => {
		navigate("/received-requests");
	};
	//----------------------------------------------------------------
	//        /search-page
	//       clicked Search
	const clickedSearch = () => {
		navigate("/search-page");
	};
	//----------------------------------------------------------------

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
					key={currentUser.user_id}
					onClick={() => clickedUser(currentUser.user_id)}
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
					<Link
						to="/chat"
						className="nav_link"
						onClick={clickStartChat}
					>
						<img
							className="icons"
							src="./images/msg.png"
							alt="chat icon"
						/>
						<div className="menu-chat">Chat</div>
					</Link>
				</div>
				<div className="menu-item" onClick={clickedRequests}>
					<img className="icons" src="./images/heart.png" />
					<div className="menu-like">Requests</div>
				</div>
				<div className="menu-item" onClick={clickedDiamond}>
					<img className="icons" src="./images/diamond.png" />
					<div className="menu-text1">Diamond</div>
				</div>
				<div className="menu-item" onClick={clickedSearch}>
					<img className="icons" src="./images/question-mark.png" />
					<div className="menu-text2">Search</div>
				</div>
				{/* <div className="vip-section">VIP</div> */}
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
				<div className="user" key={5} onClick={() => clickedUser(5)}>
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
