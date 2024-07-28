import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const router = createBrowserRouter([
  {path: '/', element: <HomePage/>},
  {path: '/login', element: <LoginPage/>},
  {path: '/registration', element: <RegistrationPage/>},
]);

export default router;