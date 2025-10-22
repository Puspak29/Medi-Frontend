import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Header, Footer } from '../components'


function Layout() {
  return (
    <div>
      <Header />
      <div className='min-h-screen mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-7 lg:px-8'>
      <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Layout
