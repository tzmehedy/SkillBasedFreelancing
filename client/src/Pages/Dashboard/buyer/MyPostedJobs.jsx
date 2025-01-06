import React from 'react';
import useAllJobs from '../../../Hooks/useAllJobs';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';

const MyPostedJobs = () => {
    const [jobs, isLoading] = useAllJobs()
    const handelDeleteTheJob = () =>{

    }

    if(isLoading) return (
      <div className="flex justify-center items-center h-screen text-[#F9128F]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
    return (
      <div className="my-20 p-10">
        <div className="overflow-x-auto">
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
              {jobs?.map((job) => (
                <tr className="">
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

                  <td className="space-x-2">
                    <button onClick={handelDeleteTheJob} className="text-xl">
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
    );
};

export default MyPostedJobs;