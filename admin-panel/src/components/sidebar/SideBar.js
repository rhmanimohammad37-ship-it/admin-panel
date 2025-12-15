import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar-logo">
        <h5 className="logo">develop with react and MUI pakage</h5>
      </div>
      <div className="links">
        <NavLink
          to="/"
          className={(activeLink) => (activeLink.isActive ? " active" : "link")}
        >
          خانه
        </NavLink>
        <NavLink
          to="/profile"
          className={(activeLink) => (activeLink.isActive ? "active" : "link")}
        >
          پروفایل
        </NavLink>
        <NavLink
          to="/users"
          className={(activeLink) => (activeLink.isActive ? " active" : "link")}
        >
          کاربران
        </NavLink>
      </div>
      <div className="login">
        <h5 className="login-title">دسترسی های حساب</h5>
        <button className="logout-btn">خروج از حساب</button>
      </div>
    </div>
  );
}
