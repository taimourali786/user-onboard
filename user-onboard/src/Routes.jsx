import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {path: '/', element: <ProtectedRoute element={<HomePage />} />},
  {path: '/login', element: <LoginPage/>},
  {path: '/registration', element: <RegistrationPage/>},
]);

export default router;