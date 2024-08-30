import React, { useState } from "react";
import Sidebar from "../../Chat/Web/ComponentsChat/Sidebar";
import Avatar_Upload_Popup from "../../UserProfile/Web/component/Avatar_Upload_Popup";
import MainDiamond from "./componente_diamond/MainDiamond";
import "../Web/Diamond_Web.css";

function Diamond_Web() {
  const [profile, setProfile] = useState({
    birthdate: "1990-02-23T23:00:00.000Z",
    children_status: "Doesn't want children",
    children_status_id: 4,
    city: "Cologne",
    country: "Germany",
    created_at: "2024-08-22T23:03:27.000Z",
    drinking_status: "Social drinker",
    drinking_status_id: 4,
    education: "Doctorate",
    education_id: 4,
    first_name: "Adrijana",
    gender: "male",
    height_cm: 175,
    id: 2,
    language: "Arabic",
    language_id: 4,
    last_name: "Lukic",
    lifestyle: "Athletic",
    lifestyle_id: 4,
    location_id: 1,
    marital_status: "Widowed",
    marital_status_id: 4,
    occupation: "Unemployed",
    occupation_id: 4,
    pet_ownership: "Not interested in pets",
    pet_ownership_id: 4,
    profile_picture_url: "/uploads/profile_pictures/Adrijana.png",
    relationship_type: "Friendship",
    relationship_type_id: 4,
    religion: "Hinduism",
    religion_id: 4,
    smoking_status: "Former smoker",
    smoking_status_id: 4,
    updated_at: "2024-08-26T00:06:29.000Z",
    user_id: 1,
    weight_kg: 72,
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleAvatarClick = () => {
		setShowPopup(true);
	};

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="diamondWeb_container">
      <Sidebar profile={profile} handleAvatarClick={handleAvatarClick} />
      <MainDiamond />
      <Avatar_Upload_Popup
        profile={profile}
        showPopup={showPopup}
        closePopup={closePopup}
      />
    </div>
  );
}

export default Diamond_Web;
