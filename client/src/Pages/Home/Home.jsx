import React from 'react';
import HeroSection from './HeroSection';
import MostPopularJobs from './MostPopularJobs';
import BrowseAllJobs from './BrowseAllJobs';

const Home = () => {
    return (
      <div>
          <HeroSection></HeroSection>
          <div className='max-w-[2550px] mx-auto p-20 space-y-10'>
            <MostPopularJobs></MostPopularJobs>
            <BrowseAllJobs></BrowseAllJobs>
          </div>
      </div>
    );
};

export default Home;