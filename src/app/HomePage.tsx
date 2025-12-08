import {
  FaFileMedical,
  FaCalendarAlt,
  FaHospitalUser,
  FaNotesMedical,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContextProvider";

export default function HomePage() {
  // Sample data
  const { currentUser } = useAuth();
  const reports = currentUser?.latestMedicalHistory;

  const lastAppointment = currentUser?.lastDoctor || currentUser?.lastPatient;

  function getCardColor(status: string){
        switch(status){
            case 'Normal':
              return 'from green-100 to-green-50';
            case 'Critical':
              return 'from red-100 to-red-50';
            case 'Attention Needed':
              return 'from yellow-100 to-yellow-50';
            default:
              return 'from blue-100 to-blue-50';
        }
    }

  return (
    <div className="mt-20 bg-gradient-to-br from-blue-50 via-cyan-100 to-teal-50 flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left pt-32 px-8 lg:px-20 gap-10">
        <div className="flex flex-row lg:w-3/4">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-snug mb-4">
            Your Health Reports, <span className="text-cyan-700">Simplified</span> 🩺
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Access, track, and manage your medical records securely — anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-medium transition-all">
              Get Started
            </button>
            <button className="border border-cyan-600 text-cyan-700 hover:bg-cyan-50 px-6 py-3 rounded-full font-medium transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
        <div className="hidden sm:flex w-72 lg:w-96 drop-shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M8.5 1.5a.5.5 0 1 0-1 0v5.243L7 7.1V4.72C7 3.77 6.23 3 5.28 3c-.524 0-1.023.27-1.443.592-.431.332-.847.773-1.216 1.229-.736.908-1.347 1.946-1.58 2.48-.176.405-.393 1.16-.556 2.011-.165.857-.283 1.857-.241 2.759.04.867.233 1.79.838 2.33.67.6 1.622.556 2.741-.004l1.795-.897A2.5 2.5 0 0 0 7 11.264V10.5a.5.5 0 0 0-1 0v.764a1.5 1.5 0 0 1-.83 1.342l-1.794.897c-.978.489-1.415.343-1.628.152-.28-.25-.467-.801-.505-1.63-.037-.795.068-1.71.224-2.525.157-.82.357-1.491.491-1.8.19-.438.75-1.4 1.44-2.25.342-.422.703-.799 1.049-1.065.358-.276.639-.385.833-.385a.72.72 0 0 1 .72.72v3.094l-1.79 1.28a.5.5 0 0 0 .58.813L8 7.614l3.21 2.293a.5.5 0 1 0 .58-.814L10 7.814V4.72a.72.72 0 0 1 .72-.72c.194 0 .475.11.833.385.346.266.706.643 1.05 1.066.688.85 1.248 1.811 1.439 2.249.134.309.334.98.491 1.8.156.814.26 1.73.224 2.525-.038.829-.224 1.38-.505 1.63-.213.19-.65.337-1.628-.152l-1.795-.897A1.5 1.5 0 0 1 10 11.264V10.5a.5.5 0 0 0-1 0v.764a2.5 2.5 0 0 0 1.382 2.236l1.795.897c1.12.56 2.07.603 2.741.004.605-.54.798-1.463.838-2.33.042-.902-.076-1.902-.24-2.759-.164-.852-.38-1.606-.558-2.012-.232-.533-.843-1.571-1.579-2.479-.37-.456-.785-.897-1.216-1.229C11.743 3.27 11.244 3 10.72 3 9.77 3 9 3.77 9 4.72V7.1l-.5-.357z"/>
        </svg>
        </div>
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/4312/4312111.png"
            alt="Healthcare Illustration"
            className="w-72 md:w-96 drop-shadow-xl"
          /> */}
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
            {(!reports || reports.length === 0) && (
            <p className="text-center text-gray-600 col-span-full">
              No medical reports available.
            </p>
          )}
            {reports && reports.map((report) => (
              <div
                key={report._id}
                className={`bg-gradient-to-br ${getCardColor(report.status)} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <FaFileMedical className="text-cyan-600 text-xl" />
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

                <button className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full text-sm transition-all">
                  View Full Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Last Appointment Section */}
      <section id="appointments" className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            🩺 Last <span className="text-cyan-700">Appointment Details</span>
          </h2>
          {(!lastAppointment) && (
            <p className="text-center text-gray-600 col-span-full">
              No appointment details available.
            </p>
          )}

          {lastAppointment && reports &&(
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
                  {new Date(reports[0]?.date).toLocaleDateString('en-IN', {
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
          )}
        </div>
      </section>
    </div>
  );
}
