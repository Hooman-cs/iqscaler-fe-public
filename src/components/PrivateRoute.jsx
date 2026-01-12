// client/src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// PrivateRoute component now accepts an adminOnly prop
const PrivateRoute = ({ adminOnly }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  // 1. Check if user is logged in
  if (!userInfo) {
    return <Navigate to='/login' replace />;
  }

  // 2. Check for admin status IF adminOnly is true
  if (adminOnly && !userInfo.isAdmin) {
    // If not admin, redirect them to the home page (or a 403 page)
    return <Navigate to='/' replace />; 
  }

  // If all checks pass, render the child component
  return <Outlet />;
};

export default PrivateRoute;