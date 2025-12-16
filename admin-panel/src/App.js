import { useRoutes } from "react-router-dom";
import urls from "./routes/routes";
import "./App.css";
import Login from "./pages/loginPage/login";

function App() {
  const routes = useRoutes(urls);

  return (
    <div className="App">
      {routes}
      {/* <Login /> */}
    </div>
  );
}

export default App;
