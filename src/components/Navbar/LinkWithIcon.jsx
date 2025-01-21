import React from "react";
import "./LinkWithIcon.css";
import { Link, NavLink } from "react-router-dom";

const LinkWithIcon = ({ title, link, emoji }) => {
  return (
    <NavLink to={link} className="align_center">
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
