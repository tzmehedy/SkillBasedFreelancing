import React from 'react';
import logo from "../../assets/images/Logo (2).png"
import { Link, NavLink } from 'react-router';
import { FaHome } from 'react-icons/fa';
import { FcAbout } from "react-icons/fc";
import useUserRole from '../../Hooks/useUserRole';
import BuyerMenus from '../../Components/sidebarmenus/BuyerMenus';
import SellerMenus from '../../Components/sidebarmenus/SellerMenus';
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import useAuth from '../../Hooks/useAuth';
import AdminMenus from '../../Components/sidebarmenus/AdminMenus';


const Sidebar = () => {
    const [role, isLoading] = useUserRole()
    const { logOut } = useAuth();

    if (isLoading)
      return (
        <div className="flex justify-center items-center h-screen text-[#F9128F]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      );

    const handelLogout = async()=>{
      await logOut()
    }
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
          {role === "buyer" && <BuyerMenus></BuyerMenus>}

          {role === "seller" && <SellerMenus></SellerMenus>}

          {role === "admin" && <AdminMenus></AdminMenus>}
        </div>

        <div className="divider"></div>

        <div>
          <NavLink className="flex items-center gap-2" to={"/"}>
            <FaHome></FaHome>Home
          </NavLink>
          <NavLink className="flex items-center gap-2" to={"profile"}>
            <CgProfile></CgProfile> Profile
          </NavLink>
          <Link onClick={handelLogout} className="flex items-center gap-2">
            <FiLogOut></FiLogOut>Logout
          </Link>
        </div>
      </div>
    );
};

export default Sidebar;