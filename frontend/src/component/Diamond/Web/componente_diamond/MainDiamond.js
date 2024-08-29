import React, { useState, useEffect } from "react";
import "./MainDiamond.css";
import Axios from "axios";

function MainDiamond() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [userProfiles, setUserProfiles] = useState([]);
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
        setUserProfiles(response.data);
        console.log(userProfiles);
      })
      .catch((error) => {
        console.error("Error fetching hobbies:", error);
      });
  }, [myProfile.gender, userProfiles]);

  useEffect(() => {
    console.log(userProfiles);
  }, [userProfiles]);

  useEffect(() => {
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
      {userProfiles
        ? userProfiles.map((item, index) => {
            return (
              <div
                className={
                  windowSize > 1200
                    ? "diamond_mainBox_big"
                    : "diamond_mainBox_small"
                }
                key={index}
              >
                <div className={windowSize > 1200 ? "imageDivBig" : "imageDivSmall"}>
                  <img
                    src={`http://localhost:5000${item.profile_picture_url}`}
                  />
                  <div className="img_text">
                    <p>
                      <label>{item.first_name}</label>{" "}
                      <label>{item.last_name}</label>,
                      <label>{item.location}</label>
                    </p>
                    <p>
                      {new Date().getFullYear() -
                        new Date(item.birthdate).getFullYear()}
                    </p>
                  </div>
                </div>
                {windowSize > 1200 ? (
                  <div className="userInfo_div">
                    <p className="above_line">
                      <label>{item.first_name}</label>{" "}
                      <label>{item.last_name}</label>
                    </p>
                    <hr />
                    <div className="under_line">
                      <img src="./icons/locationDiamond.png" />
                      <label>{item.location}</label>
                    </div>
                    <div className="under_line">
                      <img src="./icons/kalendarDiamond.png"  />
                      <label>
                        {new Date().getFullYear() -
                          new Date(item.birthdate).getFullYear()}
                          <label> Jahre alt</label>
                      </label>
                    </div>
                    <div className="under_line">
                      <img src="./icons/genderDiamond.png" />
                      <label> {item.gender}</label>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        : "Loading..."}
    </main>
  );
}

export default MainDiamond;
