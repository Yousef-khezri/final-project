import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import ModalSearch from "../../../Search/ModalSearch";

const Sidebar = ({
  profile,
  handleAvatarClick,
  closePopup,
  showPopupSearch,
  setShowPopupSearch,
  userProfiles,
  setUserProfiles
}) => {
  const navigateTo = useNavigate();

  const clickedSearch = () => {
    setShowPopupSearch(true);
    navigateTo("/diamond-page");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img className="img-logo" src="./images/logo.png" />
      </div>
      <div className="profile">
        <img
          className="img-profile-user"
          onClick={handleAvatarClick}
          src={`http://localhost:5000${profile.profile_picture_url}`}
        />
        <h3>{`${profile.first_name} ${profile.last_name}`}</h3>
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
          <img className="icons" src="./icons/search.png" />
          <div className="menu-text1">
            {
              <ModalSearch
                userProfiles={userProfiles}
                setUserProfiles={setUserProfiles}
              />
            }
          </div>
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
