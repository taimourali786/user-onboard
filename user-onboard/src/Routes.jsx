import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CarouselContainer from './components/carousel/RegistrationPage';

const router = createBrowserRouter([
  {path: '/', element: <HomePage/>},
  {path: '/login', element: <LoginPage/>},
  {path: '/registration', element: <CarouselContainer/>},
  // {path: '/carousel', element: <CarouselContainer/>},
]
);

export default router;