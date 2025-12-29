import { Popup, UserAvatar } from './'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../routes';
import { useAuth } from '../context/AuthContextProvider';
import { toast } from 'react-toastify';
import { Bell } from '../assets/SvgLogos';
import { Activity } from 'lucide-react';

const HeartbeatLogo = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
);

function Navbar() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { currentUser, setCurrentUser, setIsAuth } = useAuth();
  const navigate = useNavigate();

  function handleSelectAccount(type: string){
    setShowModal(false);
    navigate(`/auth/${type}/login`);
  }

  async function handleLogOut(){
        try{
            localStorage.removeItem("token");
            setCurrentUser(null);
            setIsAuth(false);
            toast.success("Signout successful");
        }
        catch(err){
            toast.error("Signout failed");
        }
    }
  return (
    <>
        <nav className="flex justify-between items-center px-4 sm:px-10 py-5 bg-white/90 backdrop-blur-sm shadow-md fixed w-full z-50">
            <h1 className="text-xl sm:text-2xl font-bold text-cyan-700">
                <Link to={routes.home} className="flex items-center">
                    {/* <HeartbeatLogo className="inline-block text-red-500 mr-2 w-6 h-6" /> */}
                    <div className='bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-100 inline-block mr-2'>
                    <Activity className="text-white w-6 h-6" />
                    </div>
                    MedHistory
                </Link>
            </h1>
            <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700 font-medium">
                {currentUser && (
                    <>
                        {currentUser.role === 'user' && (
                            <>
                            <Link to={routes.user.inbox} className="hover:text-cyan-600 transition-colors flex items-center gap-1">
                                <Bell className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Alerts</span>
                            </Link>
                            <Link to={routes.user.reportcards} className="hidden sm:block hover:text-cyan-600 transition-colors">
                                Reports
                            </Link>
                            </>
                        )}
                        {currentUser.role === 'doctor' && (
                            <Link to={routes.doctor.reportcard.generate} className="hidden sm:block hover:text-cyan-600 transition-colors">
                                Prescribe
                            </Link>
                        )}
                        <Link to={`${currentUser.role === 'user' ? routes.user.appointments : routes.doctor.appointments}`} className="hidden sm:block hover:text-cyan-600 transition-colors">
                            Appointments
                        </Link>
                    </>
                )}
                {(!currentUser ?
                    <button
                        id="navbar-login-btn"
                        onClick={() => setShowModal(true)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full transition-all shadow-lg text-sm sm:text-base"
                    >
                        Login
                    </button> :
                    <div className='inline-flex items-center px-2'>
                        <UserAvatar handleLogOut={handleLogOut} />
                    </div>
                )}
            </div>
        </nav>
        {showModal && <Popup setShowModal={setShowModal} handleSelectAccount={handleSelectAccount} />}
    </>
  )
}

export default Navbar
