import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ component: Component, ...props }) => {
  // const [loggedIn, userDetail] = useAuth();
  const [loggedIn, userDetail] = React.useState(true);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return loggedIn ? (
    <Component {...props} user={userDetail} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
