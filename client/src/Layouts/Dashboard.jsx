import React from 'react';
import Sidebar from '../Pages/Dashboard/Sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
      <div className="flex flex-col md:flex-row container mx-auto">
        <div className="">
          <Sidebar></Sidebar>
        </div>
        <div className="flex-1 p-2">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;