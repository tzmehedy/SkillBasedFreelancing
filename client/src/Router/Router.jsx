import React from 'react';
import Root from '../Layouts/Root';
import Home from '../Pages/Home/Home';
import { createBrowserRouter } from 'react-router';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Layouts/Dashboard';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import AddJob from '../Pages/Dashboard/buyer/AddJob';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                index:true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path: "add-job",
                element: <AddJob></AddJob>
            }
        ]
    }
])


export default router;