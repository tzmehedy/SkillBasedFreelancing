import React from 'react';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";

const BuyerHome = () => {
    return (
        <div>
            <h1>This is buyer home</h1>
            <Calendar date={new Date()} />
        </div>
    );
};

export default BuyerHome;