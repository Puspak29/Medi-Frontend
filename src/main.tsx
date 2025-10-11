import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './routes/Layout.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, Signup, UserProfile } from './app/user'
import { DoctorLogin, ReportCard, DoctorSignup } from './app/doctor/index.ts'

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
              },
              {
                path: 'login',
                element: <Login />
              }
            ]
          },
          {
            path: 'doctor',
            children: [
              {
                path: 'login',
                element: <DoctorLogin />
              },
              {
                path: 'signup',
                element: <DoctorSignup />
              }
            ]
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: 'profile',
            element: <UserProfile />
          }
        ]
      },
      {
        path: 'doctor',
        children: [
          {
            path: 'reportcard',
            element: <ReportCard />
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
