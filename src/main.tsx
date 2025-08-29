import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './routes/Layout.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './components/Signup.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'auth',
        children: [
          {
            path: 'user',
            children: [
              {
                path: 'signup',
                element: <Signup />
              }
            ]
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
