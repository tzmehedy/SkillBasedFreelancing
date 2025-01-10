import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BrowseAllJobsCard from '../../Components/BrowseAllJobsCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const AllJobs = () => {
    const axiosPublic = useAxiosPublic()
    const [jobs, setJobs] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");

    const [count, setCount] = useState(0);
    const [searchText, setSearchText] = useState("");

    const handelPaginationButton = (val) => {
      setCurrentPage(val);
    };

    const handelSearchByTitle = (e) => {
      e.preventDefault();
      const searchText = e.target.searchText.value;
      setSearchText(searchText);
    };

    useEffect(() => {
      getData();
    }, [currentPage, itemsPerPage, filter, sort, searchText]);

    const getData = async () => {
      const { data } = await axiosPublic.get(
        `/all-Jobs?page=${currentPage}&&size=${itemsPerPage}&&filter=${filter}&&sort=${sort}&&searchText=${searchText}`
      );
      setJobs(data);
    };

    useEffect(() => {
      const getCountOfData = async () => {
        const { data } = await axiosPublic.get(
          `/allJobs-count?filter=${filter}&&searchText=${searchText}`
        );
        setCount(data.count);
      };
      getCountOfData();
    }, [filter, searchText]);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    const handelReset = () => {
      setFilter("");
      setSort("");
    };
    return (
      <div className="py-32 px-10">
        <div className="flex justify-center space-x-5">
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-500 px-3 py-3 rounded-md"
              name="category"
              value={filter}
              id=""
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Ai Services">Ai Services</option>
              <option value="Writing And Translation">
                Writing And Translation
              </option>
            </select>
          </div>

          <form onSubmit={handelSearchByTitle}>
            <div className="flex items-center">
              <input
                className="px-3 w-full min-w-[300px] py-3 border border-gray-500 rounded-md"
                type="text"
                name="searchText"
                placeholder="Title"
                id=""
              />
              <button className=" btn font-bold -ml-20 bg-[#F9128F]">
                Search
              </button>
            </div>
          </form>

          <div>
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-500 px-3 py-3 rounded-md"
              name="sort"
              value={sort}
              id=""
            >
              <option value="">Sort By Deadline</option>
              <option value="asc">Sort By ascending</option>
              <option value="dsc">Sort By descending</option>
            </select>
          </div>

          <button onClick={handelReset} className="btn bg-[#F9128F] font-bold">
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-3 mt-10 gap-10">
          {jobs.map((job) => (
            <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            {" "}
            Previous
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => {
                handelPaginationButton(page + 1);
              }}
              className={`btn ${
                currentPage === page + 1 ? "bg-[#F9128F] font-bold" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            disabled={currentPage === numberOfPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    );
};

export default AllJobs;