import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../assets/images/Logo (2).png"
import { IoMdMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
    const navLinks = (
      <>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
      </>
    );
    return (
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"dashboard"}>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"}>login</NavLink>
                </li>

              </ul>
            </div>
            <Link to={"/"} className="max-w-20 ">
              <img src={logo} className="" alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
          </div>
          <div className="navbar-end ">
            <div className="dropdown dropdown-end hidden md:block">
              <div
                tabIndex={0}
                role="button"
                className=" m-1 flex space-x-2 text-xl rounded-xl  border border-slate-300 p-2"
              >
                <IoMdMenu></IoMdMenu>
                <FaRegUser></FaRegUser>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-4 space-y-3 shadow"
              >
                <NavLink to={"dashboard"} className="">
                  Dashboard
                </NavLink>
                <NavLink to={"/login"} className="">
                  Login
                </NavLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    );
};

export default Navbar;