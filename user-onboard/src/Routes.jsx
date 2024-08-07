import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from './pages/NotFound';

const router = createBrowserRouter([
  {path: '/home', element: <ProtectedRoute element={<HomePage />} />},
  {path: '/login', element: <LoginPage/>},
  {path: '/registration', element: <RegistrationPage/>},
  {path: '*', element: <NotFoundPage/>}
]);

export default router;