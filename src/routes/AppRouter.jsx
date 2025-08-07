import { useRoutes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Signup from '../components/pages/AuthPages/Signup';
import Login from '../components/pages/AuthPages/Login';
import Home from '../Private/Home';
import Navbar from '../components/layout/Navbar';
import AskQuestionModal from '../components/organisms/AskQuestionModal';
import Profile from '../components/Profile/Profile';
import Admin from '../components/Admin/Admin';

const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); // user or admin
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        console.log("userData", userData);
        const parsedUser = userData ? JSON.parse(userData) : null;

        setIsAuthenticated(!!token && token !== "undefined");
        setRole(parsedUser?.role || 'user'); // fallback to user
    }, [location]);

    const routes = useRoutes([
        {
            path: '/',
            element: isAuthenticated
                ? <Navigate to={role === 'admin' ? '/admin' : '/home'} replace />
                : <Signup />
        },
        {
            path: '/login',
            element: isAuthenticated
                ? <Navigate to={role === 'admin' ? '/admin' : '/home'} replace />
                : <Login />
        },
        {
            path: '/home',
            element: isAuthenticated && role !== 'admin'
                ? <Home />
                : <Navigate to="/login" replace />
        },
        {
            path: '/admin',
            element: isAuthenticated && role === 'admin'
                ? <Admin />
                : <Navigate to="/login" replace />
        },
        {
            path: '/navbar',
            element: isAuthenticated ? <Navbar /> : <Navigate to="/login" replace />
        },
        {
            path: '/askquestion',
            element: isAuthenticated ? <AskQuestionModal /> : <Navigate to="/login" replace />
        },
        {
            path: '/profile',
            element: isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
        },
        {
            path: '*',
            element: <Navigate to={isAuthenticated ? (role === 'admin' ? '/admin' : '/home') : '/login'} replace />
        }
    ]);

    return <>{routes}</>;
};

export default AppRouter;


