import { Button, FormControl } from "react-bootstrap";
import { useLocation, Link, NavLink } from "react-router-dom";
import useLocalstoeage from "../../customHooc/localstoeage";
import { useEffect, useRef, useState } from "react";
import "./header.css";

export default function Header() {
  const parametr = useLocation();
  const showSideBar = useRef(null);
  const [lightTheme, setLightTheme] = useState(true);
  const [setData, getData] = useLocalstoeage();

  const showSideBarFunction = () => {
    showSideBar.current.classList.toggle("show-Side-bar");
  };

  useEffect(() => {
    let newLightTheme = getData("hasLight");
    setLightTheme(newLightTheme)
    if (newLightTheme) {
      document.documentElement.style.setProperty("--active-link", "#000");
      document.documentElement.style.setProperty("--body-color", "#fff");
      document.documentElement.style.setProperty("--eleman-color", "#efefef");
      document.documentElement.style.setProperty("--text-color", "#000");
      document.documentElement.style.setProperty("--active-text", "#fff");
    } else {
      document.documentElement.style.setProperty("--active-link", "#fff");
      document.documentElement.style.setProperty("--body-color", "#000000ff");
      document.documentElement.style.setProperty("--eleman-color", "#151515ff");
      document.documentElement.style.setProperty("--text-color", "#fff");
      document.documentElement.style.setProperty("--active-text", "#000000ff");
    }
    console.log("component created");
    
  }, []);

  const changeTheme = () => {
    setLightTheme(prev => !prev);
  };

  // تغییر CSS + ذخیره در localStorage
  useEffect(() => {
    if (lightTheme) {
      document.documentElement.style.setProperty("--active-link", "#000");
      document.documentElement.style.setProperty("--body-color", "#fff");
      document.documentElement.style.setProperty("--eleman-color", "#efefef");
      document.documentElement.style.setProperty("--text-color", "#000");
      document.documentElement.style.setProperty("--active-text", "#fff");
    } else {
      document.documentElement.style.setProperty("--active-link", "#fff");
      document.documentElement.style.setProperty("--body-color", "#000000ff");
      document.documentElement.style.setProperty("--eleman-color", "#151515ff");
      document.documentElement.style.setProperty("--text-color", "#fff");
      document.documentElement.style.setProperty("--active-text", "#000000");
    }

    setData("hasLight", lightTheme);
  }, [lightTheme, setData]);

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
          className="set-theme-btn btn btn-outline-secondary"
          onClick={(e) => changeTheme(e)}
        >
          {lightTheme ? (
            <i className="bi bi-moon"></i>
          ) : (
            <i className="bi bi-brightness-high"></i>
          )}
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
            <h4>اطلاعات حساب</h4>
            <button className="logout-btn">
              خروج از حساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
