import { Button, FormControl, CloseButton } from "react-bootstrap";
import { useLocation, Link, NavLink } from "react-router-dom";
import useLocalstoeage from "../../customHooc/localstoeage";
import { useRef } from "react";
import "./header.css";

export default function Header() {
  const parametr = useLocation();
  const showSideBar = useRef(null);
  const settingDiv = useRef(null);
  const [set, get] = useLocalstoeage();

  let localColor = get("color");

  const colors = [
    { id: 1, color: "#929292ff" },
    { id: 2, color: "#000" },
    { id: 3, color: "#9CCC65" },
    { id: 4, color: "#FFB74D" },
    { id: 5, color: "#F06292" },
  ];
  const setColor = () => {
    document.documentElement.style.setProperty("--active-link", localColor);
  };
  setColor();
  const showSideBarFunction = () => {
    showSideBar.current.classList.toggle("show-Side-bar");
  };

  const showSettingContainer = () => {
    settingDiv.current.classList.toggle("show-setting-container");
  };

  const changeColorTheme = (event) => {
    const { target } = event;
    const newVariableColor = target.dataset.color;
    set("color", newVariableColor);
    localColor = get("color");

    document.documentElement.style.setProperty("--active-link", localColor);
  };
  console.log(parametr);
  return (
    <div className="header">
      <div className="header-Breadcrumb">
        <ul>
          <li>dasboard</li>
          <li>
            <Link to={`${parametr.pathname}`}>
              {parametr.pathname.slice(1, parametr.pathname.length)
                ? parametr.pathname.slice(1, parametr.pathname.length)
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
          <i className="bi bi-gear"></i>
        </Button>
        <Button
          className="list-btn btn btn-outline-secondary"
          onClick={showSideBarFunction}
        >
          <i className="bi bi-list"></i>
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
                  onClick={(e) => changeColorTheme(e)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
