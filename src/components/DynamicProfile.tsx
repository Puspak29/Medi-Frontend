import { FaEnvelope, FaPhone, FaMapPin, FaCalendar, FaStethoscope, FaUser, FaUserMd, FaIdBadge, FaCalendarTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import routes from "../routes";
import Charts from "./Charts";

const generateMockAppointments = () => {
    // Fixed 'today' for reproducible mock data
    const today = new Date(); 
    const data = [];
    
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        // Random appointments, slightly higher trend recently (last 30 days)
        const appointments = Math.floor(Math.random() * (i < 30 ? 15 : 10)) + 1;
        
        data.push({
            date: date.toISOString().split('T')[0],
            count: appointments,
        });
    }
    return data.reverse(); // Reverse so the most recent is at the end
};

const mockAppointmentData = generateMockAppointments();

function DynamicProfile() {
    const { currentUser } = useAuth();
  const isDoctor = currentUser && currentUser.role === "doctor";
  const getRoleIcon = () => {
    if (currentUser?.role === "doctor")
      return <FaUserMd className="text-cyan-700 text-8xl" />;
    return <FaUser className="text-cyan-700 text-8xl" />;
  };

  const ChartPanel = () => (
    <div className="w-full h-full">
        <Charts mockData={mockAppointmentData} />
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-6 pt-30 lg:pt-0">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-full max-w-xl lg:max-w-none">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-cyan-300/50 h-full">
              {/* Header / Banner */}
              <div className="relative h-40 bg-gradient-to-r from-cyan-600 to-blue-700">
                <img
                  src={
                    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Cover"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 rounded-full bg-gray-300 p-6 flex items-center justify-center">
                  {getRoleIcon()}
                </div>
              </div>
              {currentUser && (
                <div className="mt-16 text-center px-6 pb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isDoctor ? `Dr. ${currentUser?.name}` : currentUser?.name}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {isDoctor ? "Doctor" : "Patient"}
                </p>

                <p className="text-gray-600 mb-4">
                  {isDoctor
                    ? currentUser.specialization
                    : "Undergoing regular check-ups and treatment monitoring."}
                </p>

                {/* Contact Info */}
                <div className="flex flex-col items-center gap-3 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <FaEnvelope size={18} />
                    <span>{currentUser?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone size={18} />
                    <span>{`+91 ${currentUser?.phoneNumber || "N/A"}`}</span>
                  </div>
                  
                  {currentUser.role === "doctor" && 
                  (<div className="flex items-center gap-2">
                    <FaIdBadge size={18} />
                    <span>{currentUser.uidByNMC}</span>
                  </div>)}
                  {currentUser.role === "user" && 
                  (<>
                  <div className="flex items-center gap-2">
                    <FaCalendarTimes size={18} />
                    <span>{
                      currentUser?.dateofBirth
                        ? new Date(currentUser.dateofBirth).toLocaleDateString("en-IN", {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : "N/A"
                    }</span>
                  </div>
                  </>)}
                  <div className="flex items-center gap-2">
                    <FaMapPin size={18} />
                    <span>{currentUser?.address || "N/A"}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-around border-t pt-4">
                  {isDoctor ? (
                    <>
                      <div>
                        <p className="text-lg font-bold text-gray-800">{currentUser.patientCount}</p>
                        <p className="text-sm text-gray-500">Patients</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">{currentUser.experience}</p>
                        <p className="text-sm text-gray-500">Years Exp.</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">{currentUser.rating || "N/A"}</p>
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
                      <Link to={routes.doctor.appointments}>Check Appointment</Link>
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
                  Joined {currentUser.createdAt ? (new Date(currentUser.createdAt).toLocaleDateString('en-IN',{
                    month: 'short',
                    year: 'numeric'
                  })) : ("No Date")}
                </p>
              </div>
              ) }
              
            
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-center">
        <div className="w-full max-w-xl lg:max-w-none">
          <ChartPanel />
        </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicProfile
