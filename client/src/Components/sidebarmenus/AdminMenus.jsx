import React from 'react';
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router';

const AdminMenus = () => {
    return (
      <div>
        <NavLink className="flex items-center gap-2 " to={"all-users"}>
          <FaUser></FaUser>All Users
        </NavLink>
      </div>
    );
};

export default AdminMenus;