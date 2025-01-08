import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useUserRole();
  return (
    <div className="flex flex-col justify-center items-center h-screen shadow-xl border border-[#F9128F]">
      <div className="flex flex-col justify-center items-center shadow-xl space-y-2 rounded-xl">
        <div className="bg-[#F9128F] w-80 h-28 rounded-t-xl"></div>
        <div className="text-center space-y-2">
          <img
            src={user?.photoURL}
            className="w-20 h-20 rounded-full -mt-12"
            alt=""
          />
          <h1 className="bg-[#F9128F] uppercase  rounded-xl">{role}</h1>
        </div>
        <div className="text-center">
          <p className="font-bold">Name: {user?.displayName}</p>
          <p>User ID: {user?.uid}</p>
          <p>Email: {user?.email}</p>
        </div>
        <div className="text-center space-y-2 pb-5">
          <button className="btn btn-sm p-2 bg-[#F9128F]">
            Update Profile
          </button>{" "}
          <br />
          <button className="btn btn-sm p-2 bg-[#F9128F]">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
