import React, { useEffect, useState } from 'react';
import { User, Stethoscope, Calendar, HeartPulse, FileText, Pill, Download, Phone } from 'lucide-react'; // Added Download icon
import { useLocation } from 'react-router-dom';
import { getReportCard } from '../services/userServices';

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Critical':
            return 'bg-red-100 text-red-800 ring-red-500';
        case 'Attention Needed':
            return 'bg-yellow-100 text-yellow-800 ring-yellow-500';
        case 'Under Review':
            return 'bg-blue-100 text-blue-800 ring-blue-500';
        case 'Normal':
        default:
            return 'bg-green-100 text-green-800 ring-green-500';
    }
};

const DetailItem = ({ icon: Icon, title, content } : { icon: React.ComponentType<any>, title: string, content: string }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-inner">
        <Icon className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
            <p className="text-xs font-semibold uppercase text-gray-500">{title}</p>
            <p className="text-sm font-medium text-gray-900 break-words">{content}</p>
        </div>
    </div>
);

const DescriptionSection = ({ icon: Icon, title, content } : { icon: React.ComponentType<any>, title: string, content: string }) => (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4 border-b pb-2">
            <Icon className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
);

const ViewReport = () => {
    // const report = mockReportData;
    const [report, setReport] = useState<any>({});
    const statusClasses = getStatusStyles(report.status);
    const location = useLocation();
    const reportId = location.state.reportId;

    const handleDownload = () => {
        setTimeout(() => {
            window.print();
        }, 300);
    };

    useEffect(() => {
        if (!reportId) return;
        async function fetchReport() {
            const ReportData = await getReportCard(reportId);
            if(ReportData.success) setReport(ReportData.reportCard);
        }
       fetchReport();
    }, [reportId]);


    return (
        <div className="min-h-screen bg-gray-100 pt-25 pb-5 p-6 font-sans">
            <style>
                {`
                @media print {
                    /* --- COMPACT SIZE ADJUSTMENTS --- */
                    /* Reduce overall font size for print */
                    body, .min-h-screen {
                        font-size: 10pt !important; 
                    }
                    /* Tighter padding across all major sections */
                    .p-4, .p-6, .p-8 {
                        padding: 5px !important; /* Reduced from 10px */
                    }
                    /* Adjust specific content sizes */
                    .text-3xl { /* Header 1 */
                        font-size: 20pt !important;
                    }
                    .text-xl { /* Header 2 */
                        font-size: 14pt !important;
                    }
                    .text-sm { /* Content Text */
                        font-size: 10pt !important;
                    }
                    .text-xs { /* Labels */
                        font-size: 8pt !important;
                    }

                    /* --- LAYOUT INTEGRITY FIXES --- */
                    .no-print {
                        display: none !important;
                    }
                    
                    /* General cleanup: remove backgrounds, shadows, and optimize margins/padding */
                    .min-h-screen, .bg-gray-100 {
                        background-color: white !important;
                        padding: 0 !important;
                    }

                    .max-w-4xl {
                        max-width: 100% !important;
                        margin: 0 !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        overflow: visible !important; 
                    }

                    .shadow-2xl, .shadow-lg, .shadow-inner {
                        box-shadow: none !important;
                    }
                    
                    /* Reset light background colors to white and maintain a light border for structure */
                    .bg-gray-50, .border {
                        background-color: white !important;
                        border-color: #e5e7eb !important; 
                    }
                    
                    /* Make the indigo header lighter for print and force color printing */
                    .bg-indigo-700 {
                        
                        /* Force background and foreground colors to print */
                        -webkit-print-color-adjust: exact; 
                        color-adjust: exact;
                        border-radius: 15px !important;
                        padding: 10px 15px !important; /* Reduced header padding */
                    }

                    /* Ensure DetailItem boxes are clean and distinct */
                    .flex.items-start.space-x-3.p-4.bg-gray-50.rounded-lg.shadow-inner {
                        padding: 4px !important; /* Tighter padding for detail items */
                        border: 1px solid #eee !important;
                    }
                }
                `}
            </style>
            
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Header Section */}
                <div className="p-6 sm:p-8 bg-indigo-700 text-white flex justify-between items-start rounded-t-2xl">
                    <div>
                        <h1 className="text-3xl font-extrabold mb-1">Health Report Card</h1>
                        <p className="text-indigo-200 text-sm">Record ID: {report._id}</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3">
                        {/* Status Badge - Prominent */}
                        <div className={`px-4 py-1 text-sm font-semibold rounded-full ring-2 ${statusClasses} shadow-md`}>
                            {report.status}
                        </div>

                        {/* Download Button - Hidden in Print View */}
                        <button
                            onClick={handleDownload}
                            className="no-print flex items-center space-x-2 px-4 py-2 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:bg-indigo-50 hover:text-indigo-800 transition duration-150 text-sm"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                        </button>
                    </div>
                </div>

                {/* Date & Core Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-200">
                    <DetailItem 
                        icon={Calendar} 
                        title="Date Recorded" 
                        content={new Date(report.date).toLocaleDateString()} 
                    />
                    <DetailItem 
                        icon={HeartPulse} 
                        title="Primary Condition" 
                        content={report.condition} 
                    />
                    <DetailItem 
                        icon={FileText} 
                        title="Status" 
                        content={report.status} 
                    />
                </div>

                {/* Patient and Doctor Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    
                    {/* Patient Card */}
                    <div className="p-5 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
                        <div className="flex items-center space-x-3 mb-4 text-indigo-600">
                            <User className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Patient Details</h2>
                        </div>
                        <DetailItem 
                            icon={User} 
                            title="Name" 
                            content={report.user?.name || "N/A"} 
                        />
                        <div className="mt-2">
                            <DetailItem 
                                icon={Calendar} 
                                title="Date of Birth" 
                                content={new Date(report.user?.dob).toLocaleDateString("en-IN", {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })} 
                            />
                        </div>
                        <div className="mt-2">
                            <DetailItem 
                                icon={Phone} 
                                title="Contact Number" 
                                content={report.user?.phoneNumber || "N/A"} 
                            />
                        </div>
                    </div>

                    {/* Doctor Card */}
                    <div className="p-5 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
                        <div className="flex items-center space-x-3 mb-4 text-green-600">
                            <Stethoscope className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Attending Doctor</h2>
                        </div>
                        <DetailItem 
                            icon={Stethoscope} 
                            title="Name & Title" 
                            content={report.doctor?.name || "N/A"} 
                        />
                        <div className="mt-2">
                            <DetailItem 
                                icon={HeartPulse} 
                                title="Specialty" 
                                content={report.doctor?.specialization} 
                            />
                        </div>
                        <div className="mt-2">
                            <DetailItem 
                                icon={Phone} 
                                title="Contact Number" 
                                content={report.doctor?.phoneNumber || "N/A"} 
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-6 p-6 pt-0">
                    <DescriptionSection 
                        icon={FileText} 
                        title="Clinical Description" 
                        content={report.description} 
                    />

                    <DescriptionSection 
                        icon={Pill} 
                        title="Recommended Treatment / Plan" 
                        content={report.treatment} 
                    />
                </div>
                
                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500 rounded-b-2xl">
                    Report generated on {new Date().toLocaleString()}.
                </div>
            </div>
        </div>
    );
};

export default ViewReport;