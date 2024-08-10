import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, NotFoundPage } from './pages'
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/home" /> },
  { path: '/home', element: <ProtectedRoute element={<HomePage />} /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/registration', element: <RegistrationPage /> },
  { path: '*', element: <NotFoundPage /> }
]);

export default router;