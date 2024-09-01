import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./ComponentsChat/Sidebar";
import ChatArea from "./ComponentsChat/ChatArea";
import FriendsList from "./ComponentsChat/FriendsList";
import Avatar_Upload_Popup from "../../UserProfile/Web/component/Avatar_Upload_Popup";
import "../Web/Chat_Web.css";

const Chat_Web = ({ showPopupSearch, setShowPopupSearch }) => {
  const [userId] = useState(1);
  const [receiverId, setReceiverId] = useState(null); // شناسه گیرنده (باید از props یا route گرفته شود)

  const [usernameFriend, setUsernameFriend] = useState();
  const [pictureProfileFriend, setPictureProfileFriend] = useState();

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

  if (error) {
    return <div>{error}</div>;
  }

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
};

export default Chat_Web;
