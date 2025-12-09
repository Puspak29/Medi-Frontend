import { FaHeartbeat } from 'react-icons/fa'
import { Popup, UserAvatar } from './'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../routes';
import { useAuth } from '../context/AuthContextProvider';
import { toast } from 'react-toastify';

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
    <nav className="flex justify-between items-center px-10 py-5 bg-white/70 backdrop-blur-md shadow-sm fixed w-full z-50">
        <h1 className="text-2xl font-bold text-cyan-700">
          <Link to={routes.home} >
            <FaHeartbeat className="inline-block text-red-500 mr-2" />
            MedHistory
          </Link>
        </h1>
        <div className="flex items-center space-x-6 text-gray-700 font-medium">
            {currentUser && (
            <>
            {currentUser.role === 'user' && (
            <>
            <Link to={routes.home} className="hover:text-cyan-600">
            Features
            </Link>
            <Link to={routes.user.reportcards} className="hover:text-cyan-600">
            Reports
            </Link>
            </>)}
            {currentUser.role === 'doctor' && (
            <>
              <Link to={routes.doctor.reportcard.generate} className="hover:text-cyan-600">
              Prescribe
              </Link>
              {/* <Link to={routes.home} className="hover:text-cyan-600">
              Patient List
              </Link> */}
              </>
            )}
            <Link to={`${currentUser.role === 'user' ? routes.user.appointment : routes.doctor.appointments}`} className="hover:text-cyan-600">
            Appointment
            </Link>
            </>)}
            {(!currentUser ? 
            <button 
            onClick={() => setShowModal(true)} 
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full transition-all">
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
