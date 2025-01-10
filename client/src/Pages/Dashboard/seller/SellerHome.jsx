import React from 'react';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const SellerHome = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: statData, isLoading } = useQuery({
      queryKey: ["statData", user?.email],
      queryFn: async() =>{
        const { data } = await axiosSecure.get(`/statForSeller/${user?.email}`);
        return data
      }
    });
    if (isLoading)
      return (
        <div className="flex justify-center items-center h-screen text-[#F9128F]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      );


    
    return (
      <div className="p-10">
        <div className="flex justify-evenly">
          <div className="bg-yellow-500 shadow-lg p-5 rounded-lg">
            <p className="font-bold text-xl">No Of Bids:</p>
            <h1 className="text-end font-bold text-2xl">{statData?.noOFBids}</h1>
          </div>
          <div className="bg-green-500 rounded-lg shadow-lg p-5">
            <p className="font-bold text-xl">Total Sell</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.totalSell}
            </h1>
          </div>
          <div className="bg-blue-500 rounded-lg shadow-lg p-5">
            <p className="font-bold text-xl">Total Order Complete</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.noOFCompletedOrder}
            </h1>
          </div>
          <div className="bg-orange-500 rounded-lg shadow-lg p-5">
            <p className="font-bold text-xl">Total Order In Progress</p>
            <h1 className="text-end font-bold text-2xl">
              {statData?.noOfInProgress}
            </h1>
          </div>
        </div>

        <div className='text-end mt-20'>
          <Calendar date={new Date()} />
        </div>
      </div>
    );
};

export default SellerHome;<h1>This is seller home</h1>