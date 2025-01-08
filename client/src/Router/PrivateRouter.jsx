import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading) return (
      <div className="flex justify-center items-center h-screen text-[#F9128F]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )

    if(user) return children

    return <Navigate to={"/login"} state={{from:location}}></Navigate>
};

export default PrivateRouter;