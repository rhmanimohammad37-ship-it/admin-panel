import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-pages">
      <div className="profile-page-side-bar">
        <SideBar />
      </div>
      <div className="profile-page-content">
        <header>
          <Header />
        </header>
        <section className="admin-data">
          <div className="admin-data-child">
            <div className="admin-data-header">
              <div className="header-image">
                <img
                  src="https://cdn.imgbin.com/15/20/20/imgbin-users-group-multi-user-edit-user-s-1iGX9djrXPKhVD99hjZnUfT17.jpg"
                  className="user-image-profile"
                />
              </div>
              <div className="user-information">
                <h3>محمد رحمانی</h3>
                <p>mohammadrhmany128@gmail.com</p>
              </div>
            </div>
            <div className="admin-data-body">
              <div className="right-body">
                <FormControl disabled value='محمد'/>
                <FormControl disabled value='رحمانی'/>
                <FormControl disabled value='مذکر'/>
              </div>
              <div className="left-body">
                <FormControl disabled value='mohammadrhmany128@gmail.com'/>
                <FormControl disabled value='apple1400'/>
                <FormControl disabled value='admin'/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
