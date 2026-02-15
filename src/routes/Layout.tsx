import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Header, Footer } from '../components'


function Layout() {
  return (
    <div>
      <Header />
      <div className='min-h-screen content-center'>
      <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Layout
