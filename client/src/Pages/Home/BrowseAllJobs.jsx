import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAllJobs from '../../Hooks/useAllJobs';
import BrowseAllJobsCard from '../../Components/BrowseAllJobsCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const BrowseAllJobs = () => {
    const axiosPublic = useAxiosPublic()
    const [jobs, isLoading] = useAllJobs()
    
    const [categoryData,setCategoryData] = useState()

    const handelCategory = async(category) =>{
        const {data} = await axiosPublic.get(`/allJobs?category=${category}`)
        console.log(data)
        setCategoryData(data);
    }

    if (isLoading)
      return (
        <div className="flex justify-center items-center h-screen text-[#F9128F]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      );
    
    return (
      <div className="my-10">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Browse All Jobs</h1>
        </div>
        <Tabs>
          <TabList>
            <Tab onClick={() => handelCategory()}>All Jobs</Tab>
            <Tab onClick={() => handelCategory("Web Development")}>
              Web Development
            </Tab>
            <Tab onClick={() => handelCategory("Video Editing")}>
              Video Editing
            </Tab>
            <Tab onClick={() => handelCategory("Graphics Design")}>
              Graphics Design
            </Tab>
            <Tab onClick={() => handelCategory("Ai Services")}>Ai Services</Tab>
            <Tab onClick={() => handelCategory("Digital Marketing")}>
              Digital Marketing
            </Tab>
            <Tab onClick={() => handelCategory("Writing And Translation")}>
              Writing And Translation
            </Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {jobs?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {categoryData?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {categoryData?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {categoryData?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {categoryData?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {categoryData?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
              {categoryData?.map((job) => (
                <BrowseAllJobsCard job={job} key={job._id}></BrowseAllJobsCard>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
};

export default BrowseAllJobs;