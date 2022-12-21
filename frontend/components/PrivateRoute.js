import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    return (
        token ? children : <Navigate to ='/'/>
    )
}

export default PrivateRoute
