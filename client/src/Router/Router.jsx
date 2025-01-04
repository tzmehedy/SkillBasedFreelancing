import React from 'react';
import Root from '../Layouts/Root';
import Home from '../Pages/Home/Home';
import { createBrowserRouter } from 'react-router';

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
    }
])


export default router;