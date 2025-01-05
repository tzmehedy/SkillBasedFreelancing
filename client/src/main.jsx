import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Root from './Layouts/Root'
import router from './Router/Router'
import AuthProvider from './Provider/AuthProvider'
 import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <RouterProvider router={router}>
        <Root></Root>
      </RouterProvider>
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </>
);
