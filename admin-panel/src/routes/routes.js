import Home from "../pages/home/home";
import Profile from "../pages/profile-page/profile";
import UsersPage from '../pages/users/usersPage'

const urls = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
];

export default urls;
