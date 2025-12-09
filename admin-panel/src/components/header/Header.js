import { useRef } from "react";
import { Button, FormControl, CloseButton } from "react-bootstrap";
import "./header.css";
import { useLocation, Link, NavLink } from "react-router-dom";

export default function Header() {
  const parametr = useLocation();
  const showSideBar = useRef(null);
  const settingDiv = useRef(null);
  const colors = [
    { id: 1, color: "#ECEFF1" },
    { id: 2, color: "#000" },
    { id: 3, color: "#9CCC65" },
    { id: 4, color: "#FFB74D" },
    { id: 5, color: "#F06292" },
  ];

  const showSideBarFunction = () => {
    showSideBar.current.classList.toggle("show-Side-bar");
  };

  const showSettingContainer = () => {
    settingDiv.current.classList.toggle("show-setting-container");
  };

  setInterval(() => {
    console.log(showSideBar, settingDiv);
  }, 5000);
  return (
    <div className="header">
      <div className="header-Breadcrumb">
        <ul>
          <li>dasboard</li>
          <li>
            <Link to={`/`}>
              {parametr.pathname.slice(1, parametr.pathname.length)
                ? ""
                : "home"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="header-access">
        <FormControl placeholder="search" className="search-input" />
        <Button
          className="setting-btn btn btn-outline-secondary"
          onClick={showSettingContainer}
        >
          <i class="bi bi-gear"></i>
        </Button>
        <Button
          className="list-btn btn btn-outline-secondary"
          onClick={showSideBarFunction}
        >
          <i class="bi bi-list"></i>
        </Button>
      </div>
      <div className="resposive-side-bar" ref={showSideBar}>
        <div className="responsive-slide-bar-child">
          <div className="header-links">
            <NavLink
              to="/"
              className={(isActiveParametr) =>
                isActiveParametr.isActive ? "active-link" : "header-link"
              }
            >
              خانه
            </NavLink>
            <NavLink
              to="/profile"
              className={(isActiveParametr) =>
                isActiveParametr.isActive ? "active-link" : "header-link"
              }
            >
              پرفایل
            </NavLink>
            <NavLink
              to="/users"
              className={(isActiveParametr) =>
                isActiveParametr.isActive ? "active-link" : "header-link"
              }
            >
              کاربران
            </NavLink>
            <h4>ثبت نام در سایت</h4>
            <Link to="/users" className={"header-link"}>
              ثبت نام
            </Link>
            <Link to="/users" className={"header-link"}>
              ورود
            </Link>
          </div>
        </div>
      </div>

      <div className="setting-container" ref={settingDiv}>
        <div className="setting-container-child">
          <div className="close">
            <h5 className="setting-title">تنظیمات وب</h5>
            <CloseButton onClick={showSettingContainer} />
          </div>
          <div className="color-btn">
            <div>
              <h5 className="color-title">رنگ تم رو انتخاب کن</h5>
            </div>
            <div className="color-buttons">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className="color-button"
                  data-color={color.color}
                  style={{
                    background: color.color,
                  }}
                ></button>
              ))}
            </div>
          </div>
          <div className="web-theme">
            <div>
              <h5 className="web-theme-title">حالت نمایش</h5>
            </div>
            <div className="theme-btns">
              <button className="theme-btn">روشن</button>
              <button className="theme-btn">شیشه ای</button>
              <button className="theme-btn">تاریک</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
