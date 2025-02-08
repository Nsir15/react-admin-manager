import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/views/Login/Login';
import NotFound404 from '@/views/NotFound404/404';

const routes = [
  {
    path: '/',
    element: <h1>Home</h1>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '*',
    element: <Navigate to={'/404'} />
  },
  {
    path: '404',
    element: <NotFound404 />
  }
];

export default createBrowserRouter(routes);
