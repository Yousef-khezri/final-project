import React, { useState, useEffect } from "react";
import "./MainDiamond.css";
import Axios from "axios";

function MainDiamond() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [userProfile, setUserProfile] = useState([]);
  const myProfile = {
    user_id: 2,
    gender: "female",
    profile_picture_url: "/uploads/profile_pictures/Adrijana.png",
  };

  useEffect(() => {
    let gender;
    if (myProfile.gender && myProfile.gender === "female") {
      gender = "male";
    } else {
      gender = "female";
    }

    Axios.get(`http://localhost:5000/user-profiles/all/${gender}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hobbies:", error);
      });
  }, []);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  useEffect(() => {
    // getProfileData();
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="main">
      {userProfile
        ? userProfile.map((item, index) => {
            return (
              <div key={index}>
                <img src={`http://localhost:5000${item.profile_picture_url}`} />
                <div>
                  <p>
                    {new Date().getFullYear() -
                      new Date(item.birthdate).getFullYear()}
                  </p>
                </div>
              </div>
            );
          })
        : "Loading..."}
    </main>
  );
}

export default MainDiamond;
