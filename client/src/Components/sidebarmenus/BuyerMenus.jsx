import React from 'react';
import { FaList } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { RiUserForbidFill } from 'react-icons/ri';
import { NavLink } from 'react-router';

const BuyerMenus = () => {
    return (
      <div className='space-y-2'>
        <NavLink className="flex items-center gap-2 " to={"add-job"}>
          <IoMdAddCircleOutline></IoMdAddCircleOutline>Add Job
        </NavLink>
        <NavLink className="flex items-center gap-2 " to={"my-posted-job"}>
          <FaList></FaList>My Posted Job
        </NavLink>
        <NavLink className="flex items-center gap-2 " to={"bid-request"}>
          <RiUserForbidFill></RiUserForbidFill>Bid Request
        </NavLink>
      </div>
    );
};

export default BuyerMenus;