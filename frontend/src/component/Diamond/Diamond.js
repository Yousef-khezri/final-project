import React from "react";
import Diamond_Web from "./Web/Diamond_Web";

function Diamond({showPopupSearch, setShowPopupSearch}) {
  return (
    <div>
      <Diamond_Web
        showPopupSearch={showPopupSearch}
        setShowPopupSearch={setShowPopupSearch}
      />
    </div>
  );
}

export default Diamond;
