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
          className={(activeLink) =>
            activeLink.isActive ? "link active" : "link"
          }
        >
          <i class="bi bi-house"></i>
          <p>خانه</p>
        </NavLink>
        <NavLink
          to="/profile"
          className={(activeLink) =>
            activeLink.isActive ? "link active" : "link"
          }
        >
          <i class="bi bi-person"></i>
          <p>پروفایل</p>
        </NavLink>
        <NavLink
          to="/users"
          className={(activeLink) =>
            activeLink.isActive ? "link active" : "link"
          }
        >
          <i class="bi bi-people"></i>
          <p>کاربران</p>
        </NavLink>
      </div>
      <div className="login">
        <h5 className="login-title">ثبت نام در سایت</h5>
        <NavLink to="/sing-in" className={"link"}>
          <i class="bi bi-box-arrow-in-right"></i>
          <p> ثبت نام</p>
        </NavLink>
        <NavLink to="/sing-up" className={"link"}>
          <i class="bi bi-door-open"></i>
          <p> ورود </p>
        </NavLink>
      </div>
    </div>
  );
}
