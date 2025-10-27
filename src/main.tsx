import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './routes/Layout.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, Signup, UserProfile } from './app/user'
import { DoctorLogin, ReportCard, DoctorSignup, DoctorProfile } from './app/doctor/index.ts'
import { AuthProvider } from './context/AuthContextProvider.tsx'
import AuthGuard from './middleware/ProtectedRouter.tsx'
import OtpVerify from './app/doctor/OtpVerify.tsx'
import MyHistory from './app/user/MyHistory.tsx'
import Error from './app/Error.tsx'
import MedicalProfile from './app/user/MedicalProfile.tsx'
import ReportCards from './app/user/ReportCards.tsx'

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
                <MedicalProfile />
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
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
