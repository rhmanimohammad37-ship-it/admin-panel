import useLocalstoeage from "../../customHooc/localstoeage";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import { FormControl, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./profile.css";

export default function Profile() {
  const [set, get] = useLocalstoeage();
  const [mainUser, setMainUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userKey = get("user-key");

  useEffect(() => {
    // اگر userKey وجود نداشت، fetch نکن
    if (!userKey) {
      setLoading(false);
      return;
    }

    let isMounted = true; // برای جلوگیری از set state پس از آنمونت

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json"
        );
        if (!response.ok) {
          throw new Error("خطا در دریافت اطلاعات از سرور");
        }
        const data = await response.json();
        if (!data) {
          throw new Error("داده‌ای دریافت نشد");
        }
        const newData = Object.values(data);
        const findeUser = newData.find((user) => {
          return user.id === userKey;
        });
        if (isMounted) {
          setMainUser(findeUser || null);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          console.error(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    // تابع cleanup برای تنظیم isMounted به false
    return () => {
      isMounted = false;
    };
  }, [userKey]);

  if (loading) {
    return (
      <div className="profile-pages">
        <div className="profile-page-side-bar">
          <SideBar />
        </div>
        <div className="profile-page-content">
          <header>
            <Header />
          </header>
          <div className="loading-spinner">
            <Spinner animation="border" variant="primary" />
            <p>در حال بارگذاری اطلاعات کاربر...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-pages">
        <div className="profile-page-side-bar">
          <SideBar />
        </div>
        <div className="profile-page-content">
          <header>
            <Header />
          </header>
          <div className="error-message">
            <p>خطا: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mainUser) {
    return (
      <div className="profile-pages">
        <div className="profile-page-side-bar">
          <SideBar />
        </div>
        <div className="profile-page-content">
          <header>
            <Header />
          </header>
          <div className="no-user">
            <p>کاربری با این مشخصات یافت نشد.</p>
          </div>
        </div>
      </div>
    );
  }

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
                  alt="User profile"
                />
              </div>
              <div className="user-information">
                <h3>{`${mainUser.fName} ${mainUser.lName}`}</h3>
                <p>{mainUser.email}</p>
              </div>
            </div>
            <div className="admin-data-body">
              <div className="right-body">
                <FormControl disabled value={mainUser.fName || ""} />
                <FormControl disabled value={mainUser.lName || ""} />
                <FormControl disabled value={mainUser.userName || ""} />
              </div>
              <div className="left-body">
                <FormControl disabled value={mainUser.email || ""} />
                <FormControl disabled value={mainUser.password || ""} />
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