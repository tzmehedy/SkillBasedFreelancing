import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';

const AdminHome = () => {
    return (
      <div>
        <h1>This is admin Home</h1>
        <Calendar date={new Date()} />
      </div>
    );
};

export default AdminHome;<h1>This is admin Home</h1>