import React from 'react';
import logo from "../../assets/images/Logo (2).png"
import { Link, NavLink } from 'react-router';
import { FaHome } from 'react-icons/fa';
import { FcAbout } from "react-icons/fc";
import useUserRole from '../../Hooks/useUserRole';
import BuyerMenus from '../../Components/sidebarmenus/BuyerMenus';
import SellerMenus from '../../Components/sidebarmenus/SellerMenus';

const Sidebar = () => {
    const [role] = useUserRole()
    return (
      <div className="bg-[#F9128F] w-64 h-screen p-5">
        <div className="bg-white h-24 rounded-lg">
          <Link to={"/"}>
            <img className="h-full w-full" src={logo} alt="" />
          </Link>
        </div>
        <div className="divider"></div>

        <div className="space-y-2">
          <NavLink className="flex items-center gap-2" to={"/dashboard"}>
            <FaHome></FaHome>User Home
          </NavLink>
          {
            role === 'buyer' && <BuyerMenus></BuyerMenus>
          }

          {
            role === 'seller' && <SellerMenus></SellerMenus>
          }
        </div>

        <div className="divider"></div>

        <div>
          <NavLink className="flex items-center gap-2" to={"/"}>
            <FaHome></FaHome>Home
          </NavLink>
          <NavLink className="flex items-center gap-2" to={"/about"}>
            <FcAbout className=''></FcAbout>About
          </NavLink>
        </div>
      </div>
    );
};

export default Sidebar;