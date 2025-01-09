import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import AdminHome from './Admin/AdminHome';
import BuyerHome from './buyer/BuyerHome';
import SellerHome from './seller/SellerHome';

const DashboardHome = () => {
    const [role] = useUserRole()
    return (
        <div>

            {
                role === 'admin' && <AdminHome></AdminHome>
            }
            {
                role === 'buyer' && <BuyerHome></BuyerHome>
            }
            {
                role === 'seller' && <SellerHome></SellerHome>
            }
            
        </div>
    );
};

export default DashboardHome;