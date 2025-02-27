import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import MessageFromSellerModal from './MessageFromSellerModal';

const BidRequest = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false);
    const [bid, setBid] = useState()

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

    const handelOpen = (bid)=>{
      setIsOpen(!isOpen)
      setBid(bid)
    }

    const handelAccept = async(id, previousStatus, currentStatus) =>{
      // if(previousStatus===currentStatus) return
      const updatedInfo = {
        id,
        status:currentStatus
      }
      // await mutateAsync(updatedInfo)
      const { data } = await axiosSecure.post("/order", updatedInfo)
      window.location.replace(data.url)

    }
    const handelReject = async(id, previousStatus, currentStatus) =>{
      if(previousStatus===currentStatus) return
      const updatedInfo = {
        id,
        status:currentStatus
      }
      await mutateAsync(updatedInfo)
    }
    return (
      <div className="my-20">
        <div className="">
          <table className="table overflow-x-auto">
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
                      disabled={
                        bid?.status === "Complete" ||
                        bid?.status === "In Progress"
                      }
                      onClick={() =>
                        handelAccept(bid?._id, bid?.status, "In Progress")
                      }
                      className="bg-green-500 font-bold px-2 py-1 rounded-md"
                    >
                      Accept
                    </button>
                    <button
                      disabled={
                        bid?.status === "Complete" || bid?.status === "Rejected"
                      }
                      onClick={() =>
                        handelReject(bid?._id, bid?.status, "Rejected")
                      }
                      className="bg-red-500 font-bold px-2 py-1 rounded-md"
                    >
                      reject
                    </button>
                    {bid?.status === "Complete" && (
                      <button
                        onClick={() => handelOpen(bid)}
                        className="bg-green-500 btn btn-sm font-bold px-2 py-1 rounded-md"
                      >
                        Show Message
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <MessageFromSellerModal
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                bid={bid}
                handelOpen={handelOpen}
              ></MessageFromSellerModal>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default BidRequest;