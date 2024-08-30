import React from "react";
import Chat_Web from "./Web/Chat_Web";
import "./Chat.css";

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
};

export default Chat;
