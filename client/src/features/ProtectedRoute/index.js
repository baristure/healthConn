import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({component: Component, loggedIn, ...props}) => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return loggedIn ? <Component {...props} /> : <Navigate to="/login" />;
}

export default ProtectedRoute

