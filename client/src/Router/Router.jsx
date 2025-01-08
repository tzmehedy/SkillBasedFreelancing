import React from 'react';
import Root from '../Layouts/Root';
import Home from '../Pages/Home/Home';
import { createBrowserRouter } from 'react-router';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Layouts/Dashboard';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import AddJob from '../Pages/Dashboard/buyer/AddJob';
import MyPostedJobs from '../Pages/Dashboard/buyer/MyPostedJobs';
import JobDetails from '../Pages/JobDetails/JobDetails';
import MyBids from '../Pages/Dashboard/seller/MyBids';
import BidRequest from '../Pages/Dashboard/buyer/BidRequest';
import PrivateRouter from './PrivateRouter';
import PaymentSuccess from '../Pages/Dashboard/buyer/PaymentSuccess';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/jobDetails/:id",
        element: <JobDetails></JobDetails>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "add-job",
        element: <AddJob></AddJob>,
      },
      {
        path: "my-posted-job",
        element: <MyPostedJobs></MyPostedJobs>,
      },
      {
        path: "bid-request",
        element: <BidRequest></BidRequest>,
      },
      {
        path: "payment/success/:tranId",
        element: <PaymentSuccess></PaymentSuccess>

      },
      {
        path: "my-bids",
        element: <MyBids></MyBids>,
      },
    ],
  },
]);


export default router;