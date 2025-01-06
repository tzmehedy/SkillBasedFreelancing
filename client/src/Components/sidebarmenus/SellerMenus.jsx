import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { NavLink } from 'react-router';

const SellerMenus = () => {
    return (
      <div>
        <NavLink className="flex items-center gap-2 " to={"my-bids"}>
          <IoMdAddCircleOutline></IoMdAddCircleOutline>My Bids
        </NavLink>
      </div>
    );
};

export default SellerMenus;