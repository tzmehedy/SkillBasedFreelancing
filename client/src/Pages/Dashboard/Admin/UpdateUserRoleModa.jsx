import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const UpdateUserRoleModa = ({ isOpen, setIsOpen, currentUser,handelOpen, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const {mutateAsync} = useMutation({
    mutationFn: async(updatedInfo) =>{
        const { data } = await axiosSecure.patch("/update-user-role", updatedInfo);
        return data
    },
    onSuccess: ()=>{
        toast.success("User Role Updated Successfully")
        refetch()
        setIsOpen(false)
    }
  })
  const handelUpdate = async(e) => {
    e.preventDefault();
    const form = e.target;
    const newRole = form.role.value;

    const updatedInfo = {
        id: currentUser?._id,
        role: newRole
    }
    await mutateAsync(updatedInfo)
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handelOpen}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl shadow-2xl bg-slate-300 p-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium ">
              <form className="space-y-3" onSubmit={handelUpdate}>
                <div className="w-full">
                  <select
                    className="w-full px-3 py-2 outline-none"
                    name="role"
                    id=""
                    defaultValue={currentUser?.role}
                  >
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                <div className="">
                  <input
                    className="btn btn-sm outline-none bg-[#F9128F]"
                    type="submit"
                    value="Update"
                  />
                </div>
              </form>

              <div>
                <button
                  className="btn btn-sm bg-[#F9128F] "
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </DialogTitle>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserRoleModa;
