import "./home.css";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import Card from "../../components/card/card";

export default function Home() {
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
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </div>
    </div>
  );
}
