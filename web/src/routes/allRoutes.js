import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard/index'));
const Login = lazy(() => import('../pages/Login/Login'));

/////
const Home = lazy(()=> import('src/pages/Home/Home'))
const userRoutes = [
    { path: '/dashboard', component: <Dashboard />, id: "1", name: "Dashboard" },
   
];

const PublicRoute = [
    { path: "/login", component: <Login />, name: "Login" },
    { path: "/", component: <Home />, name: "Login" },
    { path: '*', component: <Navigate to="/" />,  }
    
];

export { userRoutes, PublicRoute };
