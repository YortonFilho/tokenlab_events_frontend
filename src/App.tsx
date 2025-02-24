import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProtectedRoute from './auth/protected-route';
import {Events} from './pages/events'
import {Invites} from './pages/invites'

export const router = createBrowserRouter([
  {
    path: "/login", 
    element: <LoginPage />, 
  },
  {
    path: "/register", 
    element: <RegisterPage />, 
  },
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <Events />
      },
      {
        path: '/invites',
        element: <Invites />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />; 
};

export default App;
