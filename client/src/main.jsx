import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Root from './Layouts/Root'
import router from './Router/Router'

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}>
      <Root></Root>
    </RouterProvider>
  </>,
)
