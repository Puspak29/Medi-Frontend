import {
  FaFileMedical,
  FaCalendarAlt,
  FaHospitalUser,
  FaNotesMedical,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContextProvider";
import { Popup } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Calendar, FileText } from "../assets/SvgLogos";

export default function HomePage() {
  // Sample data
  const { currentUser, isAuth } = useAuth();
  const reports = currentUser?.latestMedicalHistory;

  const lastAppointment = currentUser?.lastDoctor || currentUser?.lastPatient;

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<string>('login');
  function handleSelectAccount(type: string, authMode: string){
    setIsOpen(false);
    navigate(`/auth/${type}/${authMode}`);
  }

  function getCardColor(status: string) {
    switch (status) {
      case 'Normal':
        return { bg: 'bg-green-50/70 hover:bg-green-100', icon: 'text-green-600', border: 'border-green-300' };
      case 'Critical':
        return { bg: 'bg-red-50/70 hover:bg-red-100', icon: 'text-red-600', border: 'border-red-300' };
      case 'Attention Needed':
        return { bg: 'bg-yellow-50/70 hover:bg-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-300' };
      default:
        return { bg: 'bg-blue-50/70 hover:bg-blue-100', icon: 'text-blue-600', border: 'border-blue-300' };
    }
  }

  const appointmentDate = reports && reports.length > 0 ? reports[0]?.date : new Date().toISOString();

  const HealthVisual = () => (
    <div className="relative w-full max-w-sm h-80 hidden lg:flex justify-center items-center p-8">
      <div className="absolute inset-0 m-auto w-60 h-60 rounded-full bg-cyan-200/50 animate-pulse"></div>
      <div className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-cyan-300/50"></div>
      <Activity className="text-cyan-700 text-9xl relative z-10 drop-shadow-lg w-24 h-24" />
    </div>
  );

  // Placeholder component for non-logged-in users in content sections
  const GuestPlaceholder = ({ title, icon: Icon, actionText }: { title: string; icon: any; actionText: string }) => (
      <div className="col-span-full py-16 px-6 bg-white border-4 border-dashed border-cyan-200 rounded-2xl shadow-inner text-center">
          <Icon className="text-cyan-400 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Please {actionText} to access your personalized health information and history.
          </p>
          <button 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-[1.02] shadow-md"
              onClick={() => {
                
                if(!isAuth){
                  setIsOpen(true); 
                  setAuthMode('login');
                }
                else navigate(`/${currentUser?.role}/appointments`);
                 
              }}
          >
              {actionText} Now
          </button>
      </div>
  );

  return (
    <div className="bg-white font-sans min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-cyan-50 to-blue-100 pt-32 pb-24 lg:pt-40 lg:pb-40 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Your Health, <span className="text-cyan-600">Simplified and Secure</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-lg lg:max-w-none mx-auto lg:mx-0">
              Access, track, and manage your comprehensive medical reports and book consultations, and let doctors manage schedules and report cards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/50 transition-all transform hover:scale-105"
                onClick={() => { if (!isAuth){ setIsOpen(true); setAuthMode('signup'); } else navigate(`${currentUser?.role}/profile`); }}
              >
                {isAuth ? "View Profile" : "Sign Up"}
              </button>
              <button 
                className="border border-cyan-600 text-cyan-700 hover:bg-cyan-100 px-8 py-3 rounded-xl font-semibold transition-all transform hover:translate-y-[-2px]"
                onClick={() => { if (!isAuth) { setIsOpen(true); setAuthMode('login'); } else navigate(`${currentUser?.role}/appointments`); }}
              >
                {isAuth ? "Appointments" : "Login"}
              </button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <HealthVisual />
          </div>
        </div>
      </section>

      {/* Latest Report Section */}
      <section id="reports" className="py-20 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            🧾 Latest <span className="text-cyan-700">Medical Reports</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {!isAuth ? (
              <GuestPlaceholder 
                    title="Unlock Your Personal Records" 
                    icon={FileText} 
                    actionText="Log In" 
                />
            ) : (!reports || reports.length === 0) ? (
            <GuestPlaceholder
              title="No Medical Report Available"
              icon={FileText}
              actionText="Book Appointment"
             />
            ) : (reports.map((report) => {
              const color = getCardColor(report.status);
              return (
              <div
                key={report._id}
                className={`bg-gradient-to-br border ${color.border} ${color.bg} p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <FaFileMedical className={`${color.icon} text-xl`} />
                  </div>
                  <p className="text-sm text-gray-500">{new Date(report.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {report.condition}
                </h3>

                <p
                  className={`font-medium ${
                    report.status === "Normal"
                      ? "text-green-700"
                      : report.status === "Critical"
                      ? "text-red-700"
                      : report.status === "Attention Needed"
                      ? "text-yellow-700"
                      : "text-blue-700"
                  }`}
                >
                  Status: {report.status}
                </p>

                <button 
                className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full text-sm transition-all"
                onClick={() => {navigate(`/${currentUser.role}/viewreport`, {state: {reportId: report._id}}); }}
                >
                  View Full Report
                </button>
              </div>
              )
          })
            )}
          </div>
        </div>
      </section>

      {/* Last Appointment Section */}
      <section id="appointments" className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            🩺 Last <span className="text-cyan-700">Appointment Details</span>
          </h2>
          {!isAuth ? (
            <GuestPlaceholder 
              title="Secure Your Appointment History" 
              icon={Calendar} 
              actionText="Log In" 
            />
          ) : (!lastAppointment ? (
            <GuestPlaceholder
              title="No Appointment Details Available"
              icon={FileText}
              actionText="Book Appointment"
             />
          ) : (
            <>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <FaHospitalUser className="text-cyan-600 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {lastAppointment.name}
                  </h3>
                  <p className="text-gray-500">{lastAppointment.specialization}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <FaCalendarAlt className="text-cyan-700" />
                <p className="text-gray-600 font-medium">
                  {new Date(appointmentDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaNotesMedical className="text-cyan-600 mt-1" />
              <p className="text-gray-600">{lastAppointment.notes || 'No notes available'}</p>
            </div>
          </div>
          </>
          ))}
        </div>
      </section>
      {isOpen && <Popup setShowModal={setIsOpen} handleSelectAccount={handleSelectAccount} authMode={authMode} />}
    </div>
  );
}
