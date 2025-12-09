import { useRoutes } from "react-router-dom";
import urls from "./routes/routes";
import "./App.css";

function App() {
  const routes = useRoutes(urls);

  return <div className="App">{routes}</div>;
}

export default App;
