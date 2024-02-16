import {  useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ allowedRoles }) => {
    const {user,checkUser} = useContext(AuthContext)
    const hasRole = user && allowedRoles.includes(user.role);
    if (!user && checkUser ===false) {
        return <Navigate to="/" replace />;
    }

    if (!hasRole && checkUser ===false) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute