import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContextProvider"
import routes from "../routes";
import { toast } from "react-toastify";
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState } from "react";
import Popup from "./Popup";

function Header() {
    const { isAuth, currentUser, setCurrentUser, setIsAuth } = useAuth();
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const [type, setType] = useState<string | null>(null);
    const [userUrl, setUserUrl] = useState<string | null>(null);
    const [doctorUrl, setDoctorUrl] = useState<string | null>(null);

    function loginBtn(){
        setUserUrl(routes.auth.user.login)
        setDoctorUrl(routes.auth.doctor.login);
        setType('Login');
        setOpenPopup(true);
    }
    function signupBtn(){
        setUserUrl(routes.auth.user.signup)
        setDoctorUrl(routes.auth.doctor.signup);
        setType('Signup');
        setOpenPopup(true);
    }

    function handleRemovePopup(){
        setOpenPopup(false);
    }

    async function handleLogOut(){
        try{
            localStorage.removeItem("token");
            setCurrentUser(null);
            setIsAuth(false);
            toast.success("Signout successfull");
        }
        catch(err){
            toast.error("Signout failed");
        }
    }
  return (
    <header className="bg-blue-500">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={routes.home}>
              {/* <Image className="h-12 w-12" src={logo} alt="BookVenue" priority={true} /> */}
              MH
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to={routes.home}
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-blue-900 hover:text-white"
                >
                 Home
                </Link>
                {(isAuth && currentUser?.role === "user" && (
                    <Link 
                    to={routes.user.reportcards}
                    className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-blue-900 hover:text-white"
                    >
                        Reportcards
                    </Link>
                ))}
                {(isAuth && currentUser?.role === "doctor" && (
                    <Link 
                    to={routes.doctor.reportcard.generate}
                    className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-blue-900 hover:text-white"
                    >
                        Prescribe
                    </Link>
                ))}
              </div>
            </div>
          </div>
          {/* <!-- Right Side Menu --> */}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Logged Out Only --> */}
              {!isAuth && (
                <>
                  <button
                    onClick={loginBtn}
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignInAlt className="inline mr-1"/> Login
                  </button>
                  <button
                    onClick={signupBtn}
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaUser className="inline mr-1"/> Register
                  </button>
                  {openPopup && (
                      <Popup 
                      openPopup={openPopup} 
                      closePopup={handleRemovePopup} 
                      type={type} 
                      userUrl={userUrl} 
                      doctorUrl={doctorUrl} 
                      setUserUrl={setUserUrl}
                      setDoctorUrl={setDoctorUrl}
                      setType={setType}
                      setOpenPopup={setOpenPopup}

                      />
                  )}
                </>
              )}
              {isAuth && (
                <>
                  <Link 
                    to={`${currentUser?.role}/profile`} 
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                  <FaUser className="inline mr-1"/> Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="mx-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignOutAlt className="inline mr-1"/> Sign Out
                  </button>
                </>
              )}
              
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Mobile menu --> */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            to={routes.home}
            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-blue-900"
          >
            Home
          </Link>
          {(isAuth && currentUser?.role === "user" && (
                <Link 
                to={routes.user.reportcards}
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-blue-900"
                >
                    Reportcards
                </Link>
            ))}
            {(isAuth && currentUser?.role === "doctor" && (
                <Link 
                to={routes.doctor.reportcard.generate}
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-blue-900"
                >
                    Prescribe
                </Link>
            ))}
        </div>
      </div>
    </header>
  )
}

export default Header