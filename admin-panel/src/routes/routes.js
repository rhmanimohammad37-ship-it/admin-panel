import Home from "../pages/home/home";
import Profile from "../pages/profile-page/profile";

const urls = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export default urls;
