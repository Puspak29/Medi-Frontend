import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


function Layout() {
  return (
    <div>
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default Layout
