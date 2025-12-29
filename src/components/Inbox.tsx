import { useState } from "react";
import { ArrowLeft, Bell, InboxIcon, ShieldCheck } from "../assets/SvgLogos";
import { useAuth } from "../context/AuthContextProvider";

// const INITIAL_NOTIFICATIONS = [
//     {
//         id: 'otp_1',
//         otpType: 'verification',
//         otp: '582 914',
//         createdAt: '2025-12-29T14:45:00.000Z',
//         otpExpires: '2025-12-29T14:50:00.000Z',
//     }
// ];

// "notification": [
//     {
//         "_id": "695229f881b810a5d7b2f822",
//         "userEmail": "samantapuspak@gmail.com",
//         "otp": "676712",
//         "otpExpires": "2025-12-29T07:17:56.472Z",
//         "otpType": "update",
//         "createdAt": "2025-12-29T07:12:56.475Z",
//         "updatedAt": "2025-12-29T07:12:56.475Z",
//         "__v": 0
//     }
// ]

function Inbox() {
    const { currentUser } = useAuth();
    const notifications = currentUser?.notification;
    const [activeId, setActiveId] = useState<string | null>(null); // Default to null for mobile view to show list first

    const activeItem = notifications?.find((n: any) => n._id === activeId);


    const formatExpiry = (createdAt: string, otpExpires: string ) => {
        const createdTime = new Date(createdAt).getTime();
        const expiryTime = new Date(otpExpires).getTime();
        const diffInMs = expiryTime - createdTime;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInSeconds = Math.floor((diffInMs % 60000) / 1000);
        return `${diffInMinutes} minutes ${diffInSeconds} seconds`;
    }

    // if activeId is present, we show detail. Otherwise list.
    return (
        <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-4 md:pb-10 px-0 sm:px-6 flex justify-center">
            <div className="w-full max-w-5xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[calc(100vh-80px)] md:h-[75vh] border border-gray-100 relative">
                
                {/* Notification List Panel */}
                <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50 ${activeId ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <InboxIcon className="text-cyan-600" /> Notifications
                        </h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        {notifications?.map((item: any) => (
                            <button
                                key={item._id}
                                onClick={() => setActiveId(item._id)}
                                className={`w-full p-5 flex items-start gap-4 border-b border-gray-100 transition-colors ${activeId === item._id ? 'bg-white md:border-r-4 md:border-r-cyan-600' : 'hover:bg-white/60 bg-white md:bg-transparent'}`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${item.otpType === 'verification' || item.otpType === 'update' ? 'bg-cyan-100 text-cyan-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {item.otpType === 'verification' || item.otpType === 'update' ? <ShieldCheck className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-sm truncate font-medium text-gray-600`}>
                                            Your OTP code for {item.otpType}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate">{new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Window Panel */}
                <div className={`flex-1 flex flex-col bg-white overflow-y-auto ${!activeId ? 'hidden md:flex' : 'flex'}`}>
                    {activeItem ? (
                        <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-start md:justify-center text-center">
                            {/* Mobile Back Button */}
                            <button 
                                onClick={() => setActiveId(null)}
                                className="md:hidden self-start mb-6 flex items-center gap-2 text-cyan-600 font-semibold text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to list
                            </button>

                            <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${activeItem.otpType === 'verification' || activeItem.otpType === 'update' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-amber-500 text-white shadow-lg shadow-amber-200'}`}>
                                {activeItem.otpType === 'verification' || activeItem.otpType === 'update' ? <ShieldCheck className="w-8 h-8" /> : <Bell className="w-8 h-8" />}
                            </div>
                           
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{activeItem.otpType.toUpperCase()}</h3>
                            <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8 max-w-sm">{`MedHistory`} • {new Date(activeItem.createdAt).toLocaleString()}</p>

                            {(activeItem.otpType === 'verification' || activeItem.otpType === 'update') && (
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 md:p-8 mb-8 w-full max-w-[280px]">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Your OTP Code</p>
                                    <div className="text-3xl md:text-4xl font-mono font-black text-cyan-700 tracking-tighter">
                                        {activeItem.otp}
                                    </div>
                                    <p className="mt-4 text-[10px] text-gray-400">Expires in {formatExpiry(activeItem.createdAt, activeItem.otpExpires)}</p>
                                </div>
                            )}

                            <div className="w-full max-w-md p-6 bg-cyan-50/50 rounded-2xl border border-cyan-100 text-gray-700 leading-relaxed text-sm md:text-base text-left md:text-center">
                                {`This is your OTP code for ${activeItem.otpType} on MedHistory.`}
                            </div>
                            
                            <p className="mt-8 md:mt-12 text-[10px] md:text-xs text-gray-400">
                                This is a system generated message. Do not reply to this notification.
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
                            <Bell className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-center">Select a notification from the list to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Inbox;