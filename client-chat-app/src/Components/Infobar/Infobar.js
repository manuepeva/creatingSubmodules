import React from "react";
import onlineIcon from "../Icons/onlineIcon.png";
import closeIcon from "../Icons/closeIcon.png";
import "./_infobar.scss";

export const Infobar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="Online Icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="Close Icon" />
        </a>
      </div>
    </div>
  );
};

export default Infobar;
