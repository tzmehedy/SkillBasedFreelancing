import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';

const BidRequest = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data:bidsRequest, refetch} = useQuery({
        queryKey: ["bidsRequest", user?.email],
        queryFn: async()=>{
            const { data } = await axiosSecure.get(`/bidRequest/${user?.email}`);
            return data 
        }
    })

    const {mutateAsync} = useMutation({
      mutationFn: async(updatedInfo)=>{
        const { data } = await axiosSecure.patch("/bidREquestStatusUpdate", updatedInfo);
        return data
      },
      onSuccess: ()=>{
        refetch()
      }
    })

    const handelAccept = async(id, previousStatus, currentStatus) =>{
      const updatedInfo = {
        id,
        status:currentStatus
      }
      await mutateAsync(updatedInfo)

    }
    const handelReject = async(id, previousStatus, currentStatus) =>{
      const updatedInfo = {
        id,
        status:currentStatus
      }
      await mutateAsync(updatedInfo)
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
                <th>Seller Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bidsRequest?.map((bid) => (
                <tr className="">
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
                  <td>{bid?.sellerEmail}</td>
                  <td>{bid?.status}</td>

                  <td className="flex justify-center  items-center space-x-2">
                    <button
                      disabled={bid?.status === "Complete"}
                      onClick={() => handelAccept(bid?._id, bid?.status, "In Progress")}
                      className="bg-green-500 font-bold px-2 py-1 rounded-md"
                    >
                      Accept
                    </button>
                    <button
                      disabled={bid?.status === "Complete"}
                      onClick={() =>
                        handelReject(bid?._id, bid?.status, "Rejected")
                      }
                      className="bg-red-500 font-bold px-2 py-1 rounded-md"
                    >
                      reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default BidRequest;