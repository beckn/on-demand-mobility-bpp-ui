import { Navigate } from "react-router";
import { LocalKey } from "./constant";
import { history } from "./history";

export { AuthGuard };

function AuthGuard({ children }) {
  if (!sessionStorage.getItem(LocalKey.saveApi)) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
}
