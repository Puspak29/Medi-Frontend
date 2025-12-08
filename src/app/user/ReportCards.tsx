import { useEffect, useRef, useState } from "react";
import {
  FaFileMedical,
  FaDownload,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";
import { getUserReportCards } from "../../services/userServices";
import { toast } from "react-toastify";
import { useReports } from "../../context/ReportsContext"

export default function ReportCards() {
  const { reports, setReports } = useReports();
  const [loading, setLoading] = useState(!reports);
  const effectRan = useRef(false);

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
            finally{
                setLoading(false);
            }
            
        };
        fetchUserProfile();
        effectRan.current = true;
    }, [reports, setReports]);

    function getCardColor(status: string){
        switch(status){
            case 'Normal':
              return 'from green-300 to-green-200';
            case 'Critical':
              return 'from red-300 to-red-200';
            case 'Attention Needed':
              return 'from yellow-300 to-yellow-200';
            default:
              return 'from blue-300 to-blue-200';
        }
    }

    if(loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
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
          {reports && reports.map((report) => (
            <div
              key={report._id}
              className={`bg-gradient-to-br ${getCardColor(report.status)} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <FaFileMedical className="text-cyan-600 text-2xl" />
                </div>
                <button className="text-cyan-700 hover:text-cyan-900 transition-colors">
                  <FaDownload />
                </button>
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
                  className={`ml-1 font-semibold ${
                    report.status === "Normal"
                      ? "text-green-700"
                      : report.status === "Critical"
                      ? "text-red-700"
                      : report.status === "Attention Needed"
                      ? "text-yellow-700"
                      : "text-blue-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="mt-4">
                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full font-medium transition-all">
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
