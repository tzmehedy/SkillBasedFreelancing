import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UpdateUserRoleModa from './UpdateUserRoleModa';
import useUserRole from '../../../Hooks/useUserRole';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [role] = useUserRole()
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState()
    const {data:users, refetch} = useQuery({
        queryKey: ["users"],
        queryFn : async() =>{
            const {data} = await axiosSecure.get("/users")
            return data
        }
    })

    const handelOpen = (user) =>{
        setIsOpen(!isOpen)
        setCurrentUser(user)
    }

    return (
      <div className="p-20 space-y-5">
        <div>
          <h1 className="text-4xl font-bold text-center text-[#F9128F]">
            All Users
          </h1>
        </div>
        <div className="divider"></div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {users?.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    <button
                      disabled={role === user?.role}
                      onClick={() => handelOpen(user)}
                      className="btn btn-sm bg-[#F9128F] bg-opacity-30 px-2 py-1"
                    >
                      Update Role
                    </button>
                  </td>
                  <UpdateUserRoleModa
                    key={user?._id}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    currentUser={currentUser}
                    handelOpen={handelOpen}
                    refetch={refetch}
                  ></UpdateUserRoleModa>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllUsers;