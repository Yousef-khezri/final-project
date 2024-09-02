import React, { useState } from "react";
import Sidebar from "../../Chat/Web/ComponentsChat/Sidebar";
import Avatar_Upload_Popup from "../../UserProfile/Web/component/Avatar_Upload_Popup";
import MainSearch from "./componente_Search/MainSearch";
import "../Web/Search_Web.css";

function Search_Web({ currentUser, setCurrentUser, setReceiver_id }) {
	const [showPopup, setShowPopup] = useState(false);

	const handleAvatarClick = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className="diamondWeb_container">
			<Sidebar
				currentUser={currentUser}
				handleAvatarClick={handleAvatarClick}
				setReceiver_id={setReceiver_id}
			/>
			<MainSearch
				currentUser={currentUser}
				setReceiver_id={setReceiver_id}
			/>
			<Avatar_Upload_Popup
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				showPopup={showPopup}
				closePopup={closePopup}
			/>
		</div>
	);
}

export default Search_Web;
