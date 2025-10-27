import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhone, FaMapPin, FaCalendar, FaStethoscope, FaUser, FaUserMd, FaIdBadge, FaCalendarTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import routes from "../../routes";
export type User = {
    name: string,
    email: string,
    dateofBirth: Date,
    aadhaar: string,
    medicalHistory: any[],
}
export default function MedicalProfile() {
  const { currentUser } = useAuth();

   const [user, setUser] = useState<User | null>(null);
    const effectRan = useRef(false);

    useEffect(() => {
      if (effectRan.current) return;
        const fetchUserProfile = async () => {
              if (currentUser && currentUser?.role === 'user') {
                  toast.success("User profile fetched successfully");
              } else {
                  toast.error("Failed to fetch user profile");
              }
          }
        fetchUserProfile();
        effectRan.current = true;
    }, []);
  
  const isDoctor = currentUser && currentUser.role === "doctor";
  const getRoleIcon = () => {
      if (currentUser?.role === "doctor")
        return <FaUserMd className="text-cyan-700 text-8xl" />;
      return <FaUser className="text-cyan-700 text-8xl" />;
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header / Banner */}
        <div className="relative">
          <img
            src={
              isDoctor
                ? "https://images.unsplash.com/photo-1576765607924-b53de355dfc9?auto=format&fit=crop&w=800&q=80"
                : "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
            }
            alt="Cover"
            className="w-full h-40 object-cover"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 rounded-full bg-gray-300 p-6 flex items-center justify-center">
            {getRoleIcon()}
          </div>
        </div>
        {currentUser?.role === "user" && (
          <div className="mt-16 text-center px-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isDoctor ? `Dr. ${currentUser?.name}` : currentUser?.name}
          </h2>
          <p className="text-gray-500 text-sm mb-3">
            {isDoctor ? "Cardiologist" : "Patient ID: PT9834"}
          </p>

          <p className="text-gray-600 mb-4">
            {isDoctor
              ? "Specialist in heart and vascular health with 10+ years of experience."
              : "Undergoing regular cardiac check-ups and treatment plan monitoring."}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-3 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <FaEnvelope size={18} />
              <span>{currentUser?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone size={18} />
              <span>{"+91 1234567890"}</span>
            </div>
            {currentUser.role === "user" && 
            (<>
            <div className="flex items-center gap-2">
              <FaIdBadge size={18} />
              <span>{currentUser?.aadhaar}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarTimes size={18} />
              <span>{
                currentUser?.dateofBirth
                  ? new Date(currentUser.dateofBirth).toLocaleDateString("en-IN", {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : "N/A"
              }</span>
            </div>
            </>)}
            <div className="flex items-center gap-2">
              <FaMapPin size={18} />
              <span>{isDoctor ? "Apollo Hospital, Delhi" : "Kolkata, India"}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around border-t pt-4">
            {isDoctor ? (
              <>
                <div>
                  <p className="text-lg font-bold text-gray-800">1,250+</p>
                  <p className="text-sm text-gray-500">Patients</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">15</p>
                  <p className="text-sm text-gray-500">Years Exp.</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">4.9★</p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-lg font-bold text-gray-800">{currentUser.medicalHistoryCount}</p>
                  <p className="text-sm text-gray-500">Appointments</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{currentUser.medicalHistoryCount}</p>
                  <p className="text-sm text-gray-500">Prescriptions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Healthy</p>
                  <p className="text-sm text-gray-500">Status</p>
                </div>
              </>
            )}
          </div>

          {/* CTA Button */}
          <button className="mt-6 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-full flex items-center gap-2 mx-auto transition-all duration-300">
            {isDoctor ? (
              <>
                <FaStethoscope  size={18} />
                Book Appointment
              </>
            ) : (
              <>
                <FaUser size={18} />
                <Link to={routes.user.reportcards}>View Medical History</Link>
              </>
            )}
          </button>

          {/* Joined info */}
          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <FaCalendar size={16} />
            Joined {isDoctor ? "Feb 2015" : "Aug 2023"}
          </p>
        </div>
        ) }
        
      
      </div>
    </div>
  );
}
