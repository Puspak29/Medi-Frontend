import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './routes/Layout.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Appointment, Login, Signup, UserProfile, ReportCards } from './app/user'
import { DoctorLogin, ReportCard, DoctorSignup, DoctorProfile, OtpVerify, DoctorAppointments } from './app/doctor'
import { AuthProvider } from './context/AuthContextProvider.tsx'
import AuthGuard from './middleware/ProtectedRouter.tsx'
import Error from './app/Error.tsx'
import { ReportsProvider } from './context/ReportsContext.tsx'
import {ViewReport, Inbox } from './components/index.ts'

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
                element: (
                  <AuthGuard>
                    <Signup />
                  </AuthGuard>
                )
              },
              {
                path: 'login',
                element: (
                  <AuthGuard>
                    <Login />
                  </AuthGuard>
                )
              }
            ]
          },
          {
            path: 'doctor',
            children: [
              {
                path: 'login',
                element: (
                  <AuthGuard>
                    <DoctorLogin />
                  </AuthGuard>
                )
              },
              {
                path: 'signup',
                element: (
                  <AuthGuard>
                    <DoctorSignup />
                  </AuthGuard>
                )
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
            element: (
              <AuthGuard>
                <UserProfile />
              </AuthGuard>
            )
          },
          {
            path: 'reportcards',
            element: (
              <AuthGuard>
                <ReportCards />
              </AuthGuard>
            )
          },
          {
            path: 'appointments',
            element: (
              <AuthGuard>
                <Appointment />
              </AuthGuard>
            )
          },
          {
            path: 'viewreport',
            element: (
              <AuthGuard>
                <ViewReport />
              </AuthGuard>
            )
          },
          {
            path: 'inbox',
            element: (
              <AuthGuard>
                <Inbox />
              </AuthGuard>
            )
          }
        ]
      },
      {
        path: 'doctor',
        children: [
          {
            path: 'reportcard',
            element: (
              <AuthGuard>
                <ReportCard />
              </AuthGuard>
            )
          },
          {
            path: 'reportcard/verify',
            element: (
              <AuthGuard>
                <OtpVerify />
              </AuthGuard>
            )
          },
          {
            path: 'profile',
            element: (
              <AuthGuard>
                <DoctorProfile />
              </AuthGuard>
            )
          },
          {
            path: 'appointments',
            element: (
              <AuthGuard>
                <DoctorAppointments />
              </AuthGuard>
            )
          },
          {
            path: 'viewreport',
            element: (
              <AuthGuard>
                <ViewReport />
              </AuthGuard>
            )
          }
        ]
      },
      {
        path: 'error',
        element: <Error />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <ReportsProvider>
    <RouterProvider router={router} />
    </ReportsProvider>
    </AuthProvider>
  </StrictMode>,
)
