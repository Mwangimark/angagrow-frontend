import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAccessToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = getAccessToken();
    
    // Save the attempted URL for redirect after login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children ? children : <Outlet />;
};

export default ProtectedRoute;