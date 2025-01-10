import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: statData, isLoading } = useQuery({
    queryKey: ["statData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/statForAdmin/${user?.email}`);
      return data;
    },
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-[#F9128F]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
    return (
      <div>
        <div className="flex justify-evenly">
          <div className="bg-yellow-500 shadow-lg p-5 rounded-lg">
            <p className="font-bold text-xl">No Of Users:</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.totalUsers}
            </h1>
          </div>
          <div className="bg-green-500 rounded-lg shadow-lg p-5">
            <p className="font-bold text-xl">Total No OF Seller</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.totalSeller}
            </h1>
          </div>
          <div className="bg-blue-500 rounded-lg shadow-lg p-5">
            <p className="font-bold text-xl">Total Number OF Buyer</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.totalBuyer}
            </h1>
          </div>
          <div className="bg-orange-500 rounded-lg shadow-lg p-5">
            <p className="font-bold text-xl">Total Number OF Admin</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.totalAdmin}
            </h1>
          </div>
        </div>
        <div className="text-end mt-20">
          <Calendar date={new Date()} />
        </div>
      </div>
    );
};

export default AdminHome;<h1>This is admin Home</h1>