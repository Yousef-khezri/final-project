import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Sidebar from "./ComponentsChat/Sidebar";
import ChatArea from "./ComponentsChat/ChatArea";
import FriendsList from "./ComponentsChat/FriendsList";
import Avatar_Upload_Popup from "../../UserProfile/Web/component/Avatar_Upload_Popup";
import "../Web/Chat_Web.css";

const Chat_Web = ({
	currentUser,
	setCurrentUser,
	receiver_id,
	setReceiver_id,
	checkLogin,
}) => {
	// const [friendInfo, setFriendInfo] = useState(null);
	const [usernameFriend, setUsernameFriend] = useState();
	const [pictureProfileFriend, setPictureProfileFriend] = useState();

	// const [profile, setProfile] = useState(null);
	const [error, setError] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	// //----------------------------------------------------------------

	const handleAvatarClick = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	if (error) {
		return <div>{error}</div>;
	}

	if (!currentUser) {
		return <div>Loading...</div>;
	}

	return (
		<div className="main_chat_Web">
			<Header checkLogin={checkLogin} />
			<div className="body_chat_web">
				<Sidebar
					currentUser={currentUser}
					handleAvatarClick={handleAvatarClick}
					setReceiver_id={setReceiver_id}
				/>
				<ChatArea
					currentUser={currentUser}
					receiver_id={receiver_id}
					usernameFriend={usernameFriend}
					pictureProfileFriend={pictureProfileFriend}
				/>
				<FriendsList
					currentUser={currentUser}
					setReceiver_id={setReceiver_id}
					setUsernameFriend={setUsernameFriend}
					setPictureProfileFriend={setPictureProfileFriend}
				/>
				<Avatar_Upload_Popup
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					showPopup={showPopup}
					closePopup={closePopup}
				/>
			</div>
		</div>
	);
};

export default Chat_Web;
