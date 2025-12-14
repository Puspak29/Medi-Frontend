import { useState, useRef, useEffect } from "react";
import { FaSignOutAlt, FaUser, FaUserMd } from "react-icons/fa";
import { FaFilePrescription } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import routes from "../routes";

const UserAvatar = ({handleLogOut}: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { currentUser } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRoleIcon = () => {
    if (currentUser?.role === "doctor")
      return  <FaUserMd className="text-cyan-700 text-2xl" />;
    return <FaUser className="text-cyan-700 text-2xl" />;
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
       <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 transition"
      >
        {getRoleIcon()}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="font-semibold text-gray-800 truncate">
              {currentUser?.email || "User"}
            </p>
          </div>

          <ul className="text-gray-700">
            <li>
              <Link
                to={`/${currentUser?.role}/profile`}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
                onClick={() => setOpen(!open)}
              >
                <FaUser /> My Profile
              </Link>
            </li>
            {currentUser?.role === "doctor" ? (
              <li>
                <Link to={routes.doctor.reportcard.generate}
                className="sm:hidden w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
                onClick={() => setOpen(!open)}
                >
                  <FaFilePrescription />Prescribe
                </Link>
              </li>
            ) : (
              <li>
                <Link to={routes.user.reportcards}
                className="sm:hidden w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
                onClick={() => setOpen(!open)}
                >
                  <FaFilePrescription /> Reports
                </Link>
              </li>
            )}
            {currentUser && (
              <li>
              <Link to={`${currentUser.role === 'user' ? routes.user.appointments : routes.doctor.appointments}`} 
              className="sm:hidden w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
              >
                  <RiCalendarScheduleFill /> Appointments
              </Link>
            </li>
            )}
            <li>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
