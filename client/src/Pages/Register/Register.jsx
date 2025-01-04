import React, { useContext } from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios"
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const handelRegister = async(e) => {
    e.preventDefault()
    const form = e.target 
    const name = form.name.value 
    const email = form.email.value 
    const image = form.photo.files[0]

    const formData = new FormData()
    formData.append("image",image)

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgBB_Secret_Key
      }`, formData
    )
    console.log(data.data.display_url);
  };
  return (
    <>
      <div>
        <Link to={"/"} className="btn">
          <FaArrowLeft></FaArrowLeft> Back to Home
        </Link>
      </div>
      <div className="hero bg-[#064C71]  min-h-screen">
        <div className="hero-content flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-[#F9128F]">Register Now!</h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handelRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="file"
                  placeholder="Photo URL"
                  name="photo"
                  className=""
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#F9128F] font-bold text-[#064C71]">
                  Register
                </button>
              </div>
            </form>
            <div className="text-center mb-5">
              <p>
                You are already register? Please{" "}
                <span>
                  <Link to={"/login"} className="text-[#064C71] underline">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
