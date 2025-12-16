import LineChartComponent from "../../components/lineChart/LineChart";
import BarChartComponent from "../../components/bar-chart/barChart";
import SideBar from "../../components/sidebar/SideBar";
import useFetching from "../../customHooc/useFetching";
import Header from "../../components/header/Header";
import { Spinner, Table } from "react-bootstrap";
import Card from "../../components/card/card";
import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  const cardArrauInfo = [
    {
      id: 1,
      title: "کاربر های جدید",
      icon: <i className="bi bi-person-add"></i>, // تغییر class به className
      description: "+52",
    },
    {
      id: 2,
      title: "فروش هفتگی",
      icon: <i className="bi bi-shop-window"></i>,
      description: "-15%",
    },
    {
      id: 3,
      title: "تمامی کابران",
      icon: <i className="bi bi-people"></i>,
      description: "300",
    },
    {
      id: 4,
      title: "در آمد هفتگی",
      icon: <i className="bi bi-bank"></i>,
      description: "+23%",
    },
  ];

  // دریافت 3 مقدار از useFetching
  const [chartData, chartError, chartLoading] = useFetching(
    "https://admin-panel-d45dd-default-rtdb.firebaseio.com/performance.json"
  );

  const [commentData, commentError, commentLoading] = useFetching(
    "https://admin-panel-d45dd-default-rtdb.firebaseio.com/comments.json"
  );
  
  const [userInfo, userError, userLoading] = useFetching(
    "https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json"
  );
  
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // نمایش خطاها در کنسول
    if (chartError) {
      console.error("Error in performance:", chartError);
    }
    if (commentError) {
      console.error("Error in comments:", commentError);
    }
    if (userError) {
      console.error("Error in users:", userError);
    }
  }, [chartError, commentError, userError]);

  useEffect(() => {
    if (userInfo && typeof userInfo === 'object') {
      try {
        const entries = Object.entries(userInfo);
        setUsersData(entries);
      } catch (error) {
        console.error("Error converting userInfo to array:", error);
        setUsersData([]);
      }
    } else {
      setUsersData([]);
    }
  }, [userInfo]);

  // نمایش loading state
  if (chartLoading || commentLoading || userLoading) {
    return (
      <div className="home">
        <div className="home-side-bar">
          <SideBar />
        </div>
        <div className="home-content">
          <header>
            <Header />
          </header>
          <div className="loading-spinner">
            <Spinner animation="border" variant="primary" />
            <p>در حال بارگذاری اطلاعات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home-side-bar">
        <SideBar />
      </div>
      <div className="home-content">
        <header>
          <Header />
        </header>
        <section className="cards">
          {cardArrauInfo.map((cardData) => (
            <Card {...cardData} key={cardData.id} />
          ))}
        </section>
        <section className="charts">
          {chartData && Array.isArray(chartData) && chartData.length >= 3 ? (
            <>
              <LineChartComponent {...chartData[0]} key={`line-${chartData[0]?.id || 1}`} />
              <LineChartComponent {...chartData[1]} key={`line-${chartData[1]?.id || 2}`} />
              <BarChartComponent {...chartData[2]} key={`bar-${chartData[2]?.id || 3}`} />
            </>
          ) : (
            <div className="no-data-message">
              <p>داده‌ای برای نمایش نمودارها موجود نیست</p>
            </div>
          )}
        </section>
        <section className="show-web-data">
          <div className="all-users"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            <Table responsive hover className="table">
              <thead>
                <tr className="heade-row">
                  <th>نام</th>
                  <th>نام کاربری</th>
                  <th>ایمیل</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {userLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <Spinner animation="border" size="sm" />
                      <span className="me-2">در حال بارگذاری کاربران...</span>
                    </td>
                  </tr>
                ) : userError ? (
                  <tr>
                    <td colSpan={3} className="text-center text-danger">
                      خطا در بارگذاری کاربران: {userError}
                    </td>
                  </tr>
                ) : usersData.length > 0 ? (
                  usersData.map((data, index) => (
                    data[1] ? (
                      <tr key={data[1].id || index}>
                        <td>{data[1].fName || "بدون نام"}</td>
                        <td>{data[1].userName || "بدون نام کاربری"}</td>
                        <td>{data[1].email || "بدون ایمیل"}</td>
                      </tr>
                    ) : null
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      کاربری یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="user-comments"
            style={{
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <h5>نظرات کاربران</h5>
            {commentLoading ? (
              <div className="text-center">
                <Spinner animation="border" size="sm" />
                <span className="me-2">در حال بارگذاری نظرات...</span>
              </div>
            ) : commentError ? (
              <div className="text-danger">
                خطا در بارگذاری نظرات: {commentError}
              </div>
            ) : commentData && Array.isArray(commentData) && commentData.length > 0 ? (
              commentData.map((comment) => (
                comment ? (
                  <div className="comment" key={comment.id}>
                    <div className="comment-date">
                      <div className="date-email">{comment.email || "ناشناس"}</div>
                      <div className="date-history">{comment.date || "تاریخ نامعلوم"}</div>
                    </div>
                    <div className="comment-data">{comment.text || "بدون متن"}</div>
                  </div>
                ) : null
              ))
            ) : (
              <div className="no-comments">
                نظری برای نمایش وجود ندارد
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}