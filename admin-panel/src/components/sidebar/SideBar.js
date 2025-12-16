import React from "react";
import { NavLink  , Navigate} from "react-router-dom";
import useLocalstoeage from "../../customHooc/localstoeage";
import "./sidebar.css";

export default function SideBar() {
  const [setData] = useLocalstoeage();
  const logOut = () => {
    setData("isLogin", false);
    setData("user-key", undefined);
    Navigate("/");
  };

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
        <button className="logout-btn" onClick={logOut}>
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
