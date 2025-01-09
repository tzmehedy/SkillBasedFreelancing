import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const params = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const {data:job={}, isLoading} = useQuery({
        queryKey: ["job",user?.email],
        queryFn: async()=>{
            const { data } = await axiosPublic.get(`/jobDetails/${params.id}`)
            return data
        }
    })

    if(isLoading) return (
      <div className="flex justify-center items-center h-screen text-[#F9128F]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

    const handelPlaceTheBid = async(e) =>{
        e.preventDefault();
        if (user?.email === job?.BuyerEmail) {
          return Swal.fire({
            title: "Error",
            text: "Not Permitted for the bid",
            icon: "error",
          });
        }
        const form = e.target;
        const sellerEmail = user?.email;
        const title = form.title.value;
        const offerPrice = form.price.value;
        const deadline = form.deadline.value;
        const comments = form.comments.value;
        const buyerEmail = job?.buyerEmail;
        const jobId = job?._id;
        const status = "Pending";

        if (parseInt(offerPrice) < parseInt(job?.minimumPrice)) {
          return Swal.fire({
            title: "Error",
            text: "The price will be grater than or equal Minimum price",
            icon: "error",
          });
        }

        const bidInfo = {
          sellerEmail,
          title,
          offerPrice,
          deadline,
          comments,
          status,
          buyerEmail,
          jobId,
        };

        const { data } = await axiosSecure.post("/bidAJob", bidInfo)

        if(data.insertedId){
            toast.success("The bid successfully submitted")
            navigate("/dashboard/my-bids")
        }


    }
    return (
      <div className=''>
        <div className="flex shadow-2xl  p-32 md:space-x-10">
          {/* Job Details */}
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="font-bold text-3xl">{job?.title}</h1>
            <p className="text-justify">{job?.description}</p>
            <p>Deadline: {job?.deadline}</p>
            <p>
              Price: ${job?.minimumPrice} - ${job?.maximumPrice}
            </p>
            <p>Buyer Email: {job?.buyerEmail}</p>
          </div>

          {/* Place a bid */}
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="font-bold text-xl">Place Your Bid</h1>
            <hr />

            <form onSubmit={handelPlaceTheBid} className="space-y-6">
              <div className="flex space-x-10">
                <div>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email}
                    id=""
                    className="disabled w-full border border-gray-400 px-2 py-1"
                  />
                </div>
                <div>
                  <label htmlFor="Name">Title</label>
                  <input
                    type="text"
                    name="title"
                    id=""
                    value={job?.title}
                    className="w-full border border-gray-400 px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex space-x-10">
                <div>
                  <label htmlFor="Price">Price</label>
                  <input
                    type="text"
                    name="price"
                    id=""
                    className="w-full border border-gray-400 px-2 py-1"
                  />
                </div>
                <div>
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    id=""
                    className="w-full border border-gray-400 px-2 py-1"
                  />
                </div>
              </div>
              <div className="">
                <div className="w-full">
                  <label htmlFor="Price">Comments</label> <br />
                  <textarea
                    name="comments"
                    className="w-full border border-gray-400 px-2 py-1"
                    id=""
                  ></textarea>
                </div>
              </div>
              <div className="text-end">
                <button className="btn bg-[#F9128F] font-bold">
                  Place Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default JobDetails;