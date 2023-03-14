import {Navigate} from "react-router-dom";

export default function ProtectedRoute({component: Component, ...props}) {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" />
  );
}
