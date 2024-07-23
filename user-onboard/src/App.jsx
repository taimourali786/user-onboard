import { useState } from 'react';
// import Routes from './Routes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import RegistrationPage from '../src/pages/RegistrationPage';

const router = createBrowserRouter([
  {path: '/login', element: <LoginPage/>},
  {path: '/registration', element: <RegistrationPage/>}
]
)

function App() {
  const [count, setCount] = useState(0)

  return <RouterProvider router={router}/>
}

export default App
