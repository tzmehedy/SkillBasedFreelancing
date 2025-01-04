import React from 'react';
import HeroSection from './HeroSection';
import MostPopularJobs from './MostPopularJobs';

const Home = () => {
    return (
      <div>
          <HeroSection></HeroSection>
          <div className='max-w-[2550px] mx-auto p-20'>
            <MostPopularJobs></MostPopularJobs>
          </div>
      </div>
    );
};

export default Home;