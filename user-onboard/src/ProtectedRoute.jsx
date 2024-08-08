// ProtectedRoute.js
// import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { useLoading } from './context/LoadingContext.jsx';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  else {
    if (user !== null && user.profileCompletionStatus !== null && user.profileCompletionStatus === false) {
      return <Navigate to="/registration" replace />;
    }
  }

  return element;
};

export default ProtectedRoute;
