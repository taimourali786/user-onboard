import { RouterProvider } from 'react-router-dom';
import router from './Routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ErrorProvider } from './context/ErrorContext.jsx';
import { ErrorAlert } from './components/base/ErrorAlert.jsx';
function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <ErrorAlert />
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App
