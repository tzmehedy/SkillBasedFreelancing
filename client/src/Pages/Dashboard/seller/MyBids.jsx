import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CompleteModal from './CompleteModal';

const MyBids = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false);

    const {data:myBids, isLoading, refetch} = useQuery({
        queryKey: ["myBids", user?.email],
        queryFn: async()=>{
            const { data } = await axiosSecure.get(`/myBids/${user?.email}`);
            return data
        }
    })

    const handelStatus = (id, status) =>{

    }
    return (
      <div className="my-20">
        <div className="">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Offer Price</th>
                <th>Deadline</th>
                <th>Comments</th>
                <th>Buyer Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {myBids?.map((bid, index) => (
                <tr key={index} className="">
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{bid?.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid?.offerPrice}</td>
                  <td>{bid?.deadline}</td>
                  <td>{bid?.comments}</td>
                  <td>{bid?.buyerEmail}</td>
                  <td>{bid?.status}</td>

                  <td className="space-x-2">
                    <button
                      disabled={
                        bid?.status === "Complete" ||
                        bid?.status === "Pending" ||
                        bid?.status === "Rejected"
                      }
                      onClick={() => setIsOpen(true)}
                      className="bg-green-500 font-bold px-2 py-1 rounded-md"
                    >
                      Complete
                    </button>
                  </td>
                  <CompleteModal
                    isOpen={isOpen}
                    bid={bid}
                    key={index}
                    setIsOpen={setIsOpen}
                    refetch={refetch}
                  ></CompleteModal>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyBids;