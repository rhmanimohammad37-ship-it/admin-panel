import Home from "../pages/home/home";
import Profile from "../pages/profile-page/profile";
import UsersPage from "../pages/users/usersPage";
import useLocalstoeage from "../customHooc/localstoeage";
import Login from "../pages/loginPage/login";

let isLogin = JSON.parse(localStorage.getItem("isLogin"));

const urls = [
  {
    path: "/",
    element: isLogin ? <Home /> : <Login />,
  },
  {
    path: "/profile",
    element: isLogin ? <Profile />: <Login/>,
  },
  {
    path: "/users",
    element: isLogin ? <UsersPage />: <Login/>,
  },
];

export default urls;
