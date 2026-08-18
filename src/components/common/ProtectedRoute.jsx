import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = '/'
}) => {
  const { role } = useApp();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
