import React from "react";
import Chat_Web from "./Web/Chat_Web";
import "./Chat.css";

<<<<<<< HEAD
const Chat = ({ showPopupSearch, setShowPopupSearch }) => {
  return (
    <div className="chat">
      <Chat_Web
        showPopupSearch={showPopupSearch}
        setShowPopupSearch={setShowPopupSearch}
      />
    </div>
  );
=======
const Chat = ({ currentUser, setCurrentUser, receiver_id, setReceiver_id }) => {
	return (
		<div className="chat">
			<Chat_Web
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				receiver_id={receiver_id}
				setReceiver_id={setReceiver_id}
			/>
		</div>
	);
>>>>>>> e0bc5e2c745f289e54fd23332ced664febc6e0cc
};

export default Chat;
