import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Header, Footer } from '../components'
import { useEffect } from 'react';


function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload =
      navigationEntries.length > 0 &&
      (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";

    if (isReload) {
      navigate("/", { replace: true });
    }
  }, []);
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
