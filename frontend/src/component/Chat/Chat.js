import React from "react";
import Chat_Web from "./Web/Chat_Web";
import "./Chat.css";

const Chat = ({ showPopupSearch, setShowPopupSearch }) => {
  return (
    <div className="chat">
      <Chat_Web
        showPopupSearch={showPopupSearch}
        setShowPopupSearch={setShowPopupSearch}
      />
    </div>
  );
};

export default Chat;
