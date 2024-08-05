// ProtectedRoute.js
// import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  else {
    if (user !== null && user.profileStatus !== null || user.profileStatus !== 'completed') {
      return <Navigate to="/registration" replace />;
    }
  }

  return element;
};

export default ProtectedRoute;
