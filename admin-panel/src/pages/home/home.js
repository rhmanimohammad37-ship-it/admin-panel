import "./home.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import Card from "../../components/card/card";

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
            <Card {...cardData} key={cardData.id}/>
          ))}
        </section>
      </div>
    </div>
  );
}
