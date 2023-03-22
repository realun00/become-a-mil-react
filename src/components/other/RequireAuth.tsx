import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectName } from "../../redux/slices/playerReducer";

//For users that are logged in and try to go to for ex. /sign-in
const NoAuth = () => {
  const user = useSelector(selectName);

  return !user ? <Outlet /> : <Navigate to="/game" />;
};

//For unauthorized users that try to access auth only route ex. /home
const WithAuth = () => {
  const user = useSelector(selectName);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export { NoAuth, WithAuth };
