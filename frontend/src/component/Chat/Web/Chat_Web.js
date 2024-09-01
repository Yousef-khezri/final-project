import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./ComponentsChat/Sidebar";
import ChatArea from "./ComponentsChat/ChatArea";
import FriendsList from "./ComponentsChat/FriendsList";
import Avatar_Upload_Popup from "../../UserProfile/Web/component/Avatar_Upload_Popup";
import "../Web/Chat_Web.css";

<<<<<<< HEAD
const Chat_Web = ({ showPopupSearch, setShowPopupSearch }) => {
  const [userId] = useState(1);
  const [receiverId, setReceiverId] = useState(null); // شناسه گیرنده (باید از props یا route گرفته شود)

  const [usernameFriend, setUsernameFriend] = useState();
  const [pictureProfileFriend, setPictureProfileFriend] = useState();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
=======
const Chat_Web = ({ currentUser, setCurrentUser, receiver_id, setReceiver_id }) => {
	// const [userId] = useState(currentUser.id);
	// const [receiverId, setReceiverId] = useState(null); // شناسه گیرنده (باید از props یا route گرفته شود)

	const [usernameFriend, setUsernameFriend] = useState();
	const [pictureProfileFriend, setPictureProfileFriend] = useState();

	// const [profile, setProfile] = useState(null);
	const [error, setError] = useState("");
	const [showPopup, setShowPopup] = useState(false);
>>>>>>> e0bc5e2c745f289e54fd23332ced664febc6e0cc

  const handleAvatarClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

<<<<<<< HEAD
  useEffect(() => {
    // Fetch user profile when component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          params: {
            user_id: userId, // ارسال user_id به عنوان پارامتر
          },
        });
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
=======
	// useEffect(() => {
	// 	// Fetch user profile when component mounts
	// 	const fetchUserProfile = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"http://localhost:5000/profile",
	// 				{
	// 					params: {
	// 						user_id: userId, // ارسال user_id به عنوان پارامتر
	// 					},
	// 				}
	// 			);
	// 			setProfile(response.data);
	// 		} catch (err) {
	// 			if (err.response && err.response.data) {
	// 				setError(err.response.data.message);
	// 			} else {
	// 				setError("An error occurred while fetching the profile.");
	// 			}
	// 		}
	// 	};

	// 	fetchUserProfile();
	// }, [userId]);
>>>>>>> e0bc5e2c745f289e54fd23332ced664febc6e0cc

  if (error) {
    return <div>{error}</div>;
  }

<<<<<<< HEAD
  if (!profile) {
    return <div>Loading...</div>;
  } else {
    console.log(profile);
  }

  return (
    <div className="chat_Web">
      <Sidebar
        profile={profile}
        handleAvatarClick={handleAvatarClick}
        showPopupSearch={showPopupSearch}
        setShowPopupSearch={setShowPopupSearch}
      />
      <ChatArea
        receiverId={receiverId}
        usernameFriend={usernameFriend}
        pictureProfileFriend={pictureProfileFriend}
      />
      <FriendsList
        setReceiverId={setReceiverId}
        setUsernameFriend={setUsernameFriend}
        setPictureProfileFriend={setPictureProfileFriend}
        // usernameFriend, pictureProfileFriend
      />
      <Avatar_Upload_Popup
        profile={profile}
        showPopup={showPopup}
        closePopup={closePopup}
      />
    </div>
  );
=======
	if (!currentUser) {
		return <div>Loading...</div>;
	}

	return (
		<div className="chat_Web">
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
	);
>>>>>>> e0bc5e2c745f289e54fd23332ced664febc6e0cc
};

export default Chat_Web;
