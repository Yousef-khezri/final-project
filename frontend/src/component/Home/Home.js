import React, { useState, useEffect } from "react";
import HomeWeb from "./HomeWeb/HomeWeb";
import HomeHandy from "./HomeHandy/HomeHandy";
import "./Home.css";

export default function Home() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
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
    <div className="home_container">
      {windowSize > 450 ? <HomeWeb /> : <HomeHandy />}
    </div>
  );
}
