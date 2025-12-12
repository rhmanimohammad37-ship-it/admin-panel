import "./home.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import Card from "../../components/card/card";
import LineChartComponent from "../../components/lineChart/LineChart";
import BarChartComponent from "../../components/bar-chart/barChart";

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
  const chartsArray = [
    {
      data: [100, 600, 300, 500, 300, 450, 185, 550, 440, 230, 250, 120],
      xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      label: "فروش  ماهیانه",
      color: "#50ab50ff",
      update: "3روز قبل",
    },
    {
      data: [75, 30, 35, 50, 100, 85, 25],
      xAxis: [1, 2, 3, 4, 5, 6, 7],
      label: "فروش هفتگی",
      color: "#36e6e6ff",
      update: "1ساعت پیش",
    },
  ];
  const barChartArry = [
    {
      data: [75, 30, 35, 50, 100, 85, 25],
      xAxis: [1, 2, 3, 4, 5, 6, 7],
      label: "کابران جدید ",
      color: "#679d60ff",
      update: "2 روز قبل",
    },
  ];
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
          {chartsArray.map((chart) => (
            <LineChartComponent {...chart} />
          ))}
          <BarChartComponent {...barChartArry[0]} />
        </section>
      </div>
    </div>
  );
}
