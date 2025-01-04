import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/images/Banner/corporate-management-strategy-solution-branding-concept.jpg"
import img2 from "../../assets/images/Banner/marketing-strategy-planning-strategy-concept.jpg"
import img3 from "../../assets/images/Banner/programming-background-collage.jpg"

const HeroSection = () => {
    return (
      <div className=''>
        <Carousel className=' text-center'>
          <div>
            <img className='max-h-[550px]' src={img1} />
          </div>
          <div>
            <img className='max-h-[550px]' src={img2} />
            
          </div>
          <div>
            <img className='max-h-[550px]' src={img3} />
          </div>
          
        </Carousel>
      </div>
    );
};

export default HeroSection;