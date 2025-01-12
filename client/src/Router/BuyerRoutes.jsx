import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';

const BuyerRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useUserRole();

    if (loading && isLoading)
      return (
        <div className="flex justify-center items-center h-screen text-[#F9128F]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      );
    if (user && role === "buyer") return children;
    return <Navigate to={"/dashboard"}></Navigate>;
};

export default BuyerRoutes;