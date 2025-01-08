import React from 'react';
import useAllJobs from '../../../Hooks/useAllJobs';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyPostedJobs = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data:postedJobs, isLoading, refetch} = useQuery({
        queryKey: ["postedJob", user?.email],  
        queryFn: async()=>{
            const { data } = await axiosSecure.get(`/my-posted-jobs/${user?.email}`, {withCredentials:true});
            return data
        }
    })

    const handelDeleteTheJob = async(id) =>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async(result) => {
          if (result.isConfirmed) {
            const { data } = await axiosSecure.delete(`/deleteJob/${id}`)
            if(data.deletedCount>0){
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                refetch()
            }
            
          }
        });
    }

    if(isLoading) return (
      <div className="flex justify-center items-center h-screen text-[#F9128F]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
    return (
      <>
        <div className="text-center">
          <h1 className="text-[#F9128F] text-3xl font-bold">
            Your Posted Jobs
          </h1>
          <div className="divider"></div>
        </div>
        <div className="p-10">
          <div className="overflow-x-auto md:overflow-y-auto max-h-screen">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Minimum Price</th>
                  <th>Maximum Price</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {postedJobs?.map((job, index) => (
                  <tr key={index} className="">
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{job?.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>{job?.description.substring(0, 40)}...</td>
                    <td>{job?.deadline}</td>
                    <td>{job?.minimumPrice}</td>
                    <td>{job?.maximumPrice}</td>

                    <td className="space-x-2 flex items-center">
                      <button
                        onClick={() => handelDeleteTheJob(job?._id)}
                        className="text-xl"
                      >
                        <MdDelete />
                      </button>
                      <Link>
                        <button className="text-xl">
                          <FaRegEdit />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default MyPostedJobs;