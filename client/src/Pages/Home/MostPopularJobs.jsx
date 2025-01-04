import React from 'react';
import serviceImg1 from "../../assets/images/Services/AI.jpg";
import serviceImg2 from "../../assets/images/Services/writingAndTranslation.jpg";
import serviceImg3 from "../../assets/images/Services/webdevelopment.png";
import serviceImg4 from "../../assets/images/Services/videoEditing.png";
import serviceImg5 from "../../assets/images/Services/digitalMarketing.png";
import serviceImg6 from "../../assets/images/Services/GraphicsDesign.png";

const MostPopularJobs = () => {
    return (
      <div className="space-y-10 my-20">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Our Most popular Services</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="shadow-2xl border p-5 rounded-lg border-gray-200 space-y-3">
            <img className="w-16 h-16" src={serviceImg6} alt="" />
            <h1 className="font-bold">Graphics Design</h1>
          </div>
          <div className="shadow-2xl border p-5 rounded-lg border-gray-200 space-y-3">
            <img className="w-16 h-16" src={serviceImg3} alt="" />
            <h1 className="font-bold">Web Development</h1>
          </div>
          <div className="shadow-2xl border p-5 rounded-lg border-gray-200 space-y-3">
            <img className="w-16 h-16" src={serviceImg4} alt="" />
            <h1 className="font-bold">video Editing</h1>
          </div>
          <div className="shadow-2xl border p-5 rounded-lg border-gray-200 space-y-3">
            <img className="w-16 h-16" src={serviceImg5} alt="" />
            <h1 className="font-bold">Digital Marketing</h1>
          </div>
          <div className="shadow-2xl border p-5 rounded-lg border-gray-200 space-y-3">
            <img className="w-16 h-16" src={serviceImg1} alt="" />
            <h1 className="font-bold">AI Services</h1>
          </div>
          <div className="shadow-2xl border p-5 rounded-lg border-gray-200 space-y-3">
            <img className="w-16 h-16" src={serviceImg2} alt="" />
            <h1 className="font-bold">Writing And Translation</h1>
          </div>
        </div>
      </div>
    );
};

export default MostPopularJobs;