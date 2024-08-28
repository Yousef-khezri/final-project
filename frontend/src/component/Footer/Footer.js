import React, { useState, useEffect } from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="logoBox">
        <img className="logo" src="./images/phoenix-logo .png" />
      </div>
      <div className="box">
        <div className="contact">
          <h4>CONTACT US</h4>
          <p>
            <img className="fIcon" src="./icons/footerPhone.png" />
            <label>04871 123456</label>
          </p>
          <p>
            <img className="fIcon" src="./icons/footerEmail.png" />
            <label>fhoenix@gmail.com</label>
          </p>
          <p>
            <img className="fIcon" src="./icons/footerLocation.png" />
            <label>04871 123456</label>
          </p>
        </div>
        <div className="wHours">
          <h4>WORKING HOURS</h4>
          <p>Mon. - Fri. : 09:00 am - 05:00 pm</p>
          <p>Saturday and Sundays closed</p>
        </div>
        <div className="iconBox">
          <p>Sign up</p>
          <div className="inputDiv">
            <input />
            <img src="./icons/footerPaper-plane.png" />
          </div>
          <div className="iconsLastones">
            <img className="FBimg" src="./icons/footerFB.png" />
            <img src="./icons/footerInstagram.png" />
            <img src="./icons/footerYT.png" />
            <img className="LiImg" src="./icons/footerLinkedin.png" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
