import "./home.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import Card from "../../components/card/card";
import LineChartComponent from "../../components/lineChart/LineChart";
import BarChartComponent from "../../components/bar-chart/barChart";
import { Spinner, Table } from "react-bootstrap";
import useFetching from "../../customHooc/useFetching";

export default function Home() {
  const cardArrauInfo = [
    {
      id: 1,
      title: "کاربر های جدید",
      icon: <i class="bi bi-person-add"></i>,
      description: "+52",
    },
    {
      id: 2,
      title: "فروش هفتگی",
      icon: <i class="bi bi-shop-window"></i>,
      description: "-15%",
    },
    {
      id: 3,
      title: "تمامی کابران",
      icon: <i class="bi bi-people"></i>,
      description: "300",
    },
    {
      id: 4,
      title: "در آمد هفتگی",
      icon: <i class="bi bi-bank"></i>,
      description: "+23%",
    },
  ];
  const [chartData, chartError] = useFetching(
    "https://admin-panel-d45dd-default-rtdb.firebaseio.com/performance.json"
  );

  const [commentData, commentError, commentLoading] = useFetching(
    "https://admin-panel-d45dd-default-rtdb.firebaseio.com/comments.json"
  );
  const [userData, userError, userLoading] = useFetching(
    "https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json"
  );

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
          {chartData.length !== 0 && (
            <>
              <LineChartComponent {...chartData[0]} key={chartData[0].id} />
              <LineChartComponent {...chartData[1]} key={chartData[1].id} />
              <BarChartComponent {...chartData[2]} key={chartData[2].id} />
            </>
          )}
          {chartError.length !== 0 && alert(`${chartError} in performance `)}
        </section>
        <section className="show-web-data">
          <div className="all-users">
            <Table responsive hover className="table">
              <thead>
                <tr className="heade-row">
                  <th>نام</th>
                  <th>نام کاربری</th>
                  <th>ایمیل</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {userLoading === true && <Spinner />}
                {userError === true && alert(`${userError} in show users`)}
                {userData.length !== 0 &&
                  userData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.fullName}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="user-comments">
            {commentLoading === true && <Spinner />}
            {commentError.length !== 0 &&
              alert(`${commentError} in comment section`)}
            {commentData.length !== 0 &&
              commentData.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="comment-date">
                    <div className="date-email">{comment.email}</div>
                    <div className="date-history">{comment.date}</div>
                  </div>
                  <div className="comment-data">{comment.text}</div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
