import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import useFetching from "../../customHooc/useFetching";
import "./userpage.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [comments, setcomments] = useState([]);

  const [usersData, usersError, usersLoading] = useFetching(
    `https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json`
  );

  const [commentsData, commentsError, commentsLoading] = useFetching(
    `https://admin-panel-d45dd-default-rtdb.firebaseio.com/comments.json`
  );

  useEffect(async () => {
    try {
      const userResponse = await fetch(
        "https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json"
      );
      const commentsResponse = (Response = await fetch(
        "https://admin-panel-d45dd-default-rtdb.firebaseio.com/comments.json"
      ));
      if (commentsResponse.ok && userResponse.ok) {
        const parsUsers = await userResponse.json();
        const parsComments = await commentsResponse.json();
        setUsers(Object.values(parsUsers))
        setcomments(Object.values(parsComments))
      }
    } catch (error) {}
  }, []);
  console.log(commentsData);
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
          <div className="user-table">
            <div className="user-title">
              <h3>کاربران</h3>
            </div>
            <div className="user-info">
              {usersError === true && alert(usersError)}
              {usersLoading === true && <Spinner />}
              {users.length !== 0 && 
                users.map(user=>(
                  <div className="data">
                    <div className="full-name">
                      {`${user.fName} ${user.lName}`}
                    </div>
                    <div className="email">{user.email}</div>
                    <div className="password">{user.password}</div>
                    <div className="edit">
                      <button className="edit-btn">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button className="remove-btn">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                ))
              }

              {/* {users[1].length !== 0 &&
                usersData[1].map((user) => (
                  
                ))} */}
            </div>
          </div>
          <div className="comment-table">
            <div className="user-title">
              <h3>کامنت ها</h3>
            </div>
            <div className="user-info">
              {commentsError === true && alert(usersError)}
              {commentsLoading === true && <Spinner />}
              {comments.length !== 0 &&
                comments.map((comment) => (
                  <div className="comments">
                    <div className="comments-date">
                        <div>{comment.email}</div>
                        <div>{comment.date}</div>
                    </div>
                    <div className="comments-info">{comment.text}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
