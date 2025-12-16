import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import useFetching from "../../customHooc/useFetching";
import "./userpage.css";
import { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [userResponse, commentsResponse] = await Promise.all([
          fetch(
            "https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json"
          ),
          fetch(
            "https://admin-panel-d45dd-default-rtdb.firebaseio.com/comments.json"
          ),
        ]);

        if (!userResponse.ok || !commentsResponse.ok) {
          throw new Error(
            `خطا در دریافت اطلاعات: ${userResponse.status} - ${commentsResponse.status}`
          );
        }

        const parsUsers = await userResponse.json();
        const parsComments = await commentsResponse.json();

        // تبدیل به آرایه و اضافه کردن id
        const usersArray = parsUsers
          ? Object.entries(parsUsers).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];

        const commentsArray = parsComments
          ? Object.entries(parsComments).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];

        setUsers(usersArray);
        setComments(commentsArray);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // فقط یک بار هنگام mount اجرا می‌شود

  // تابع برای حذف کاربر
  const handleDeleteUser = (userId) => {
    if (window.confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // تابع برای حذف کامنت
  const handleDeleteComment = (commentId) => {
    if (window.confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  if (loading) {
    return (
      <div className="users-page">
        <div className="users-page-side-bar">
          <SideBar />
        </div>
        <div className="users-page-content">
          <header>
            <Header />
          </header>
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">در حال بارگذاری...</span>
            </Spinner>
            <p>در حال بارگذاری اطلاعات...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-page">
        <div className="users-page-side-bar">
          <SideBar />
        </div>
        <div className="users-page-content">
          <header>
            <Header />
          </header>
          <div className="error-container">
            <Alert variant="danger">
              <Alert.Heading>خطا در دریافت اطلاعات</Alert.Heading>
              <p>{error}</p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => window.location.reload()}
              >
                تلاش مجدد
              </button>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-page-side-bar">
        <SideBar />
      </div>
      <div className="users-page-content">
        <header>
          <Header />
        </header>
        <div className="show-users-info">
          {/* بخش کاربران */}
          <div className="user-table">
            <div className="user-title">
              <h3>کاربران ({users.length})</h3>
            </div>
            <div className="user-info">
              {users.length === 0 ? (
                <div className="no-data">
                  <p>هیچ کاربری یافت نشد</p>
                </div>
              ) : (
                users.map((user) => (
                  <div className="data" key={user.id}>
                    <div className="full-name">
                      {`${user.fName || ""} ${user.lName || ""}`.trim() ||
                        "نامشخص"}
                    </div>
                    <div className="email">{user.email || "ایمیل ندارد"}</div>
                    <div className="password">
                      {user.password ? user.password : "بدون رمز"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* بخش کامنت‌ها */}
          <div className="comment-table">
            <div className="user-title">
              <h3>کامنت‌ها ({comments.length})</h3>
            </div>
            <div className="user-info">
              {comments.length === 0 ? (
                <div className="no-data">
                  <p>هیچ کامنتی یافت نشد</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div className="comments" key={comment.id}>
                    <div className="comments-date">
                      <div>{comment.email || "ناشناس"}</div>
                      <div>{comment.date || "تاریخ نامعلوم"}</div>
                    </div>
                    <div className="comments-info">
                      {comment.text || "بدون متن"}
                    </div>
                    <div className="comment-actions">
                      <button
                        className="remove-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                      ></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
