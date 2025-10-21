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
            path: 'profile',
            element: (
              <AuthGuard>
                <DoctorProfile />
              </AuthGuard>
            )
          }
        ]
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
