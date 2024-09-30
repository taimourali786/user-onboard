import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, NotFoundPage } from './pages'
import ProtectedRoute from './ProtectedRoute';
import { checkAuth } from './utils/authUtil';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/registration', element: <RegistrationPage /> },
  {
    path: '/',
    loader: checkAuth,
    children: [
      { index: true, loader: () => redirect('/home') },
      { path: '/home', element: <HomePage /> },
    ]
  },
  { path: '*', element: <NotFoundPage /> }

]);

export default router;