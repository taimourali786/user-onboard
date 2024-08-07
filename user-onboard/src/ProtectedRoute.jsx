// ProtectedRoute.js
// import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, authLoading, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  else {
    if (authLoading) {
      if (user !== null && user.profileCompletionStatus !== null && user.profileCompletionStatus !== true) {
        return <Navigate to="/registration" replace />;
      }
    }
  }

  return element;
};

export default ProtectedRoute;
