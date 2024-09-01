import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./component/Home/Home";
import LoginRegister from "./component/LoginRegistration/LoginRegister";
import Notfound from "./component/Notfound";
import Chat from "./component/Chat/Chat";
import UserProfile from "./component/UserProfile/UserProfile";
import Diamond from "./component/Diamond/Diamond";
import AboutUs from "./component/Home/AboutUs/AboutUs";

function App() {
  const [checkLogin, setCheckLogin] = useState(false);
  const [showPopupSearch, setShowPopupSearch] = useState(false);

  const updateCheckLogin = () => {
    setCheckLogin(true);
  };

  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home checkLogin={checkLogin} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/diamond-page"
            element={
              <Diamond
                showPopupSearch={showPopupSearch}
                setShowPopupSearch={setShowPopupSearch}
              />
            }
          />
          <Route
            path="/login-register"
            element={<LoginRegister updateCheckLogin={updateCheckLogin} />}
          />
          <Route
            path="/chat"
            element={
              <Chat
                showPopupSearch={showPopupSearch}
                setShowPopupSearch={setShowPopupSearch}
              />
            }
          />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
