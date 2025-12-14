import { useEffect, useRef } from "react";
import {
  FaFileMedical,
  FaDownload,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";
import { getUserReportCards } from "../../services/userServices";
import { toast } from "react-toastify";
import { useReports } from "../../context/ReportsContext"
import { useNavigate } from "react-router-dom";

export default function ReportCards() {
  const { reports, setReports } = useReports();
  const effectRan = useRef(false);
  const navigate = useNavigate();

    useEffect(() => {
        if(reports) return;
        const fetchUserProfile = async () => {
            if (effectRan.current) return;
            try{
                const response = await getUserReportCards();
                if (response.success) {
                    setReports(response.medicalHistory ?? null);
                    toast.success("Reportcard fetched successfully");
                } else {
                    toast.error(response.message);
                }
            }
            catch(err){
                toast.error('Failed to fetch reportcards, please try again');
            }
            
        };
        fetchUserProfile();
        effectRan.current = true;
    }, [reports, setReports]);

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

  return (
    <div className="min-h-screen mt-20 bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧾 Medical Report Cards
          </h1>
          <p className="text-gray-500">
            Review and download your medical reports anytime.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(!reports || reports.length === 0) && (
            <p className="text-center text-gray-600 col-span-full">
              No report cards available.
            </p>
          )}
          {reports && reports.map((report) => {
            const color = getCardColor(report.status);
            return (
            <div
              key={report._id}
              className={`bg-gradient-to-br border ${color.border} ${color.bg} p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <FaFileMedical className={`${color.icon} text-2xl`} />
                </div>
                {/* <button className="text-cyan-700 hover:text-cyan-900 transition-colors">
                  <FaDownload className={`${color.icon}`} />
                </button> */}
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {report.condition}
              </h2>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaCalendarAlt className="mr-2 text-cyan-700" />
                {new Date(report.date).toLocaleDateString("en-IN", {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })} 
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <FaHeartbeat className="mr-2 text-cyan-700" />
                Status:
                <span
                  className={`ml-1 font-semibold ${color.icon}`}
                >
                  {report.status}
                </span>
              </div>

              <div className="mt-4">
                <button 
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full font-medium transition-all"
                onClick={() => {navigate(`/user/viewreport`, {state: { reportId: report._id }});}}
                >
                  View Full Report
                </button>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
