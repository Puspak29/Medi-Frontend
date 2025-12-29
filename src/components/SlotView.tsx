import { Calendar, CheckCircle2, FileSpreadsheet, Loader2, MailQuestion, X } from "lucide-react";
import { useState } from "react";

function SlotView(props: any) {
  const { slotName, slotUsers, setIsOpen } = props;

    const [isSlotExporting, setIsSlotExporting] = useState(false);

  const triggerDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSlotUsers = () => {
    setIsSlotExporting(true);
    setTimeout(() => {
      const headers = ["Queue Position", "Patient Name", "Email", "Booking Time (Local)"];
      const sortedUsers = slotUsers
        .slice()
        .sort((a: any, b: any) => new Date(a.bookedAt).getTime() - new Date(b.bookedAt).getTime());

      const csvContent = [
        headers.join(","),
        ...sortedUsers.map((item: any, index: number) => {
          const time = new Date(item.bookedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return `${index + 1},"${item.user.name}","${item.user.email}","${time}"`;
        })
      ].join("\n");

      triggerDownload(`Booking_List_${slotName.replace(/\s+/g, '_')}.csv`, csvContent);
      setIsSlotExporting(false);
    }, 800);
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Calendar size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Appointment Slot Details</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{slotName}</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={downloadSlotUsers}
                  disabled={isSlotExporting}
                  className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all border border-slate-100 disabled:opacity-50"
                  title="Export to Excel"
                >
                  {isSlotExporting ? <Loader2 size={20} className="animate-spin" /> : <FileSpreadsheet size={20} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8">
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-1">
                {slotUsers.length === 0 ? (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                      <MailQuestion className="text-slate-300" size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">No users have booked this slot yet.</p>
                  </div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-0">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Queue</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Patient</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Booked At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slotUsers
                          .slice()
                          .sort((a: any, b: any) => new Date(a.bookedAt).getTime() - new Date(b.bookedAt).getTime())
                          .map((item: any, index: number) => (
                            <tr key={item.user._id} className="group hover:bg-white transition-colors">
                              <td className="px-4 py-4">
                                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                  {index + 1}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div>
                                  <p className="text-sm font-bold text-slate-800">{item.user.name || "Unknown User"}</p>
                                  <p className="text-xs text-slate-500">{item.user.email}</p>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <span className="text-xs font-medium text-slate-500 bg-white border border-slate-100 px-2 py-1 rounded-md">
                                  {new Date(item.bookedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex gap-3 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Confirm List
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SlotView
