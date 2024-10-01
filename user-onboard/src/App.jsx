import { RouterProvider } from 'react-router-dom';
import router from './Routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Loading from './components/base/Loading.jsx';
import { CustomAlert } from './components/base/CustomAlert.jsx';

function App() {
  return (
    <AuthProvider>
      <Loading>
        <CustomAlert />
        <RouterProvider router={router} />
      </Loading>
    </AuthProvider>
  )
}

export default App
