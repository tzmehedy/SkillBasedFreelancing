import React from 'react';
import { useParams } from 'react-router';

const PaymentSuccess = () => {
    const {tranId} = useParams()
    return (
      <div className="flex justify-center items-center">
        <div>
          <h1>Payment success</h1>
          <h1>Transition ID: {tranId}</h1>
        </div>
      </div>
    );
};

export default PaymentSuccess;