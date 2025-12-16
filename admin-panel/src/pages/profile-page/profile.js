import useLocalstoeage from "../../customHooc/localstoeage";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import { FormControl } from "react-bootstrap";
import useFetching from "../../customHooc/useFetching";
import { useState, useEffect } from "react";
import "./profile.css";

export default function Profile() {
  const [set, get] = useLocalstoeage();
  const [mainUser, setMainUser] = useState({});

  const userKey = get("user-key");
  useEffect(async () => {
    try {
      const response = await fetch(
        "https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json"
      );
      if (response.ok) {
        const data = await response.json();
        const newData = Object.values(data);
        const findeUser = newData.find((user) => {
          return user.id === userKey;
        });
        console.log(findeUser);
        setMainUser(() => findeUser);
      }
    } catch (error) {
      alert(error);
    }
  }, []);
  console.log(mainUser.fName);

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
                <h3>{`${mainUser.fName} ${mainUser.lName}`}</h3>
                <p>{mainUser.email}</p>
              </div>
            </div>
            <div className="admin-data-body">
              <div className="right-body">
                <FormControl disabled value={mainUser.fName} />
                <FormControl disabled value={mainUser.lName} />
                <FormControl disabled value={mainUser.userName} />
              </div>
              <div className="left-body">
                <FormControl disabled value={mainUser.email} />
                <FormControl disabled value={mainUser.password} />
                <FormControl
                  disabled
                  value={mainUser.gender === "male" ? "مرد" : "زن"}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
