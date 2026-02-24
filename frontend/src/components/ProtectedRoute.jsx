import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(userStr);
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            // Redirect to their own dashboard if they try to access another role's area
            return <Navigate to={`/${user.role}`} replace />;
        }
        return children;
    } catch (e) {
        localStorage.removeItem('user');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
