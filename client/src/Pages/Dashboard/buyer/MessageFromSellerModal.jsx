import React from 'react';
import { Dialog, DialogPanel } from "@headlessui/react";
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
const MessageFromSellerModal = ({ setIsOpen , isOpen, bidId}) => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data:sellerMessage} = useQuery({
        queryKey: ["sellerMessage"],
        queryFn: async()=>{
            const { data } = await axiosSecure.get(
              `/MyCompleteOrder?email=${user?.email}&&id=${bidId}`
            );
            return data
        }
    })

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className=" space-y-4 border-2 border-[#F9128F] bg-[#F9128F] bg-opacity-95 max-w-80 shadow-2xl p-12">
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Message From Seller:</h1>
            <p className="text-justify border-2 p-2 rounded-lg">
              {sellerMessage?.message}
            </p>
            <div className="flex justify-center items-center space-x-3">
              <img src={sellerMessage?.image} className="w-32 h-32" alt="" />
              <FaDownload
                onClick={() => saveAs(sellerMessage?.image, "image")}
              ></FaDownload>
            </div>

            <div className="text-end">
              <button
                className="btn bg-blue-600 border-none font-bold"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default MessageFromSellerModal;