import { RouterProvider } from 'react-router-dom';
import router from './Routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ErrorProvider } from './context/ErrorContext.jsx';
import { ErrorAlert } from './components/base/ErrorAlert.jsx';
import { SuccessProvider } from './context/SuccessContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
import Loading from './components/base/Loading.jsx';
import { SuccessAlert } from './components/base/SuccessAlert.jsx';

function App() {
  return (
    <LoadingProvider>
      <ErrorProvider>
        <SuccessProvider>
          <AuthProvider>
            <Loading>
              <SuccessAlert />
              <ErrorAlert />
              <RouterProvider router={router} />
            </Loading>
          </AuthProvider>
        </SuccessProvider>
      </ErrorProvider>
    </LoadingProvider>
  )
}

export default App
