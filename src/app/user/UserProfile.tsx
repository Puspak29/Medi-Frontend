import { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { Activity, AlertCircle, HeartPulse, Mail, MapPin, Phone, Save, Settings, Share2, Shield, User, X } from "lucide-react";
import { updateProfile } from "../../services/userServices";
import { toast } from "react-toastify";


const HEALTH_DATA_SETS: Record<string, { label: string; bp: number }[]> = {
  Month: [
    { label: 'Wk 1', bp: 118 }, { label: 'Wk 2', bp: 122 }, { label: 'Wk 3', bp: 120 }, { label: 'Wk 4', bp: 125 }
  ],
  Year: [
    { label: 'Jan', bp: 118 }, { label: 'Feb', bp: 122 }, { label: 'Mar', bp: 120 }, { label: 'Apr', bp: 125 },
    { label: 'May', bp: 121 }, { label: 'Jun', bp: 119 }, { label: 'Jul', bp: 123 }, { label: 'Aug', bp: 120 }
  ]
};

const MetricCard = ({ value, label, color }: { value: any; label: string; color: string }) => (
  <div className="bg-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center gap-1">
    <span className={`text-base sm:text-2xl font-black ${color}`}>{value}</span>
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);

const DetailItem = ({ label, value, icon: Icon }: { label: string; value: any; icon: React.ComponentType<{ size: number }> }) => (
  <div className="flex items-center gap-4 min-w-0">
    <div className="p-2.5 sm:p-3 bg-slate-50 rounded-2xl text-slate-400 shrink-0">
      <Icon size={18} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{label}</p>
      <p className="text-xs sm:text-sm font-bold text-slate-700 truncate">{value}</p>
    </div>
  </div>
);

const EditProfileModal = ({ isOpen, onClose, initialData }: { isOpen: boolean; onClose: () => void; initialData: any }) => {
  const { setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    bloodType: initialData?.bloodType || 'N/A',
    height: initialData?.height || '',
    weight: initialData?.weight || '',
    emergencyProtocol: {
      criticalAllergies: initialData?.emergencyProtocol?.criticalAllergies || '',
      emergencyContact: {
        name: initialData?.emergencyProtocol?.emergencyContact?.name || '',
        phoneNumber: initialData?.emergencyProtocol?.emergencyContact?.phoneNumber || '',
      }
    }
  });

  if (!isOpen) return null;

  const handleSave = async (e: any) => {
    e.preventDefault();
    const res = await updateProfile(formData);
    if(res.success) {
      setCurrentUser({...initialData, ...formData});
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900">Update Health Profile</h3>
            <p className="text-xs text-slate-500 font-medium">Keep your medical vitals and protocols current.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Vitals Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} /> Basic Vitals
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Blood Group</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                  value={formData.bloodType}
                  onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'N/A'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Height (cm)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Weight (kg)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Emergency Protocols Section */}
          <div className="space-y-4 pt-2">
            <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={14} /> Emergency Protocol
            </h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Critical Allergies</label>
                <textarea 
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none resize-none"
                  placeholder="e.g. Peanuts, Latex, Aspirin"
                  value={formData.emergencyProtocol.criticalAllergies}
                  onChange={(e) => setFormData({
                    ...formData, 
                    emergencyProtocol: { ...formData.emergencyProtocol, criticalAllergies: e.target.value }
                  })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 ml-1">Contact Name</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none"
                    value={formData.emergencyProtocol.emergencyContact.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyProtocol: {
                        ...formData.emergencyProtocol,
                        emergencyContact: { ...formData.emergencyProtocol.emergencyContact, name: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 ml-1">Contact Phone</label>
                  <input 
                    type="tel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none"
                    value={formData.emergencyProtocol.emergencyContact.phoneNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyProtocol: {
                        ...formData.emergencyProtocol,
                        emergencyContact: { ...formData.emergencyProtocol.emergencyContact, phoneNumber: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 bg-slate-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const { currentUser } = useAuth();
  const user = currentUser;
  const [timeframe, setTimeframe] = useState('Year');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentChartData = HEALTH_DATA_SETS[timeframe];

  return (
    <div className="min-h-screen max-w-full bg-slate-50 overflow-y-auto animate-in fade-in duration-500 pb-20">
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialData={user} 
      />
      <div className="h-[45vh] sm:h-[40vh] bg-indigo-900 relative">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover opacity-20"
          alt="Medical Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
        
        {/* Top Navbar - Added padding top for safe areas */}
        <div className="absolute top-0 inset-x-0 p-6 sm:p-8 flex items-center justify-between text-white z-20">
          <div className="flex gap-2">
             <button className="p-2.5 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 border border-white/20">
                <Share2 size={18} />
             </button>
             <button className="p-2.5 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 border border-white/20">
                <Settings size={18} />
             </button>
          </div>
        </div>

        {/* Profile Identity - Improved spacing for mobile */}
        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 pb-6 sm:pb-10">
            {/* Avatar - Reduced size slightly for mobile to save vertical space */}
            <div className="w-28 h-28 sm:w-44 sm:h-44 rounded-[28px] sm:rounded-[40px] bg-white p-1.5 sm:p-2 shadow-2xl relative shrink-0">
              <div className="w-full h-full rounded-[24px] sm:rounded-[34px] bg-indigo-50 flex items-center justify-center text-indigo-600 border-2 border-indigo-100 overflow-hidden">
                <User size={50} className="sm:w-20 sm:h-20" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-emerald-500 rounded-xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                <Shield size={14} />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1 min-w-0">
               <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-1 sm:mb-2">
                 <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 tracking-tight line-clamp-1">
                    {user?.name}
                 </h2>
                 <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                   PRO
                 </span>
               </div>
               <p className="text-base sm:text-xl text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
                 <span className="truncate">{`Health ID: ${user?.email.split('@')[0].toUpperCase()}`}</span>
                 <span className="hidden sm:inline w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                 <span className="hidden sm:inline text-slate-400">Joined {user?.createdAt ? (new Date(user.createdAt).getFullYear()) : ''}</span>
               </p>
            </div>
            
            <div className="w-full md:w-auto mt-2 md:mt-0">
              <button className="w-full md:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-95 text-sm sm:text-base"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Health Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          <div className="lg:col-span-8 space-y-6 sm:space-y-10">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <MetricCard value={user?.bloodType ?? 'N/A'} label="Blood Type" color="text-rose-500" />
              <MetricCard value={`${user?.dateofBirth ? new Date().getFullYear() - new Date(user.dateofBirth).getFullYear() : 'N/A'} yrs`} label="Current Age" color="text-indigo-500" />
              <MetricCard value={`${user?.height ?? 'N/A'} cm`} label="Height" color="text-emerald-500" />
              <MetricCard value={`${user?.weight ?? 'N/A'} kg`} label="Weight" color="text-blue-500" />
            </div>

            {/* Health Charts */}
            <div className="bg-white p-5 sm:p-10 rounded-[28px] sm:rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900">Vitals Monitoring</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Systolic Blood Pressure (mmHg)</p>
                </div>
                <div className="flex p-1 bg-slate-100 rounded-xl self-end sm:self-auto">
                  {['Month', 'Year'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setTimeframe(opt)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                        timeframe === opt ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-48 sm:h-64 w-full relative">
                <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 50, 100, 150, 200].map(val => (
                    <line key={val} x1="0" y1={200-val} x2="800" y2={200-val} stroke="#f1f5f9" strokeWidth="1" />
                  ))}
                  <path
                    d={`M ${currentChartData.map((d, i) => `${(i * (800/(currentChartData.length-1)))}, ${200 - (d.bp - 80) * 3}`).join(' L ')}`}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <path
                    d={`M 0 200 L ${currentChartData.map((d, i) => `${(i * (800/(currentChartData.length-1)))}, ${200 - (d.bp - 80) * 3}`).join(' L ')} L 800 200 Z`}
                    fill="url(#chartGrad)"
                  />
                  {currentChartData.map((d, i) => (
                    <g key={i}>
                      <circle cx={(i * (800/(currentChartData.length-1)))} cy={200 - (d.bp - 80) * 3} r="6" fill="#4f46e5" />
                      <text x={(i * (800/(currentChartData.length-1)))} y="230" textAnchor="middle" className="text-[14px] fill-slate-400 font-bold">{d.label}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Medical History Searchable */}
            {/* <div className="bg-white p-5 sm:p-10 rounded-[28px] sm:rounded-[40px] border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900">Medical Journey</h3>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Filter records..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>
                
                {filteredHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {filteredHistory.map(item => (
                      <TbTimelineEvent key={item.id} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 font-medium italic">
                    No records matching your search...
                  </div>
                )}
            </div> */}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <div className="bg-white p-7 sm:p-8 rounded-[28px] sm:rounded-[40px] border border-slate-200 shadow-sm">
                <h4 className="text-base sm:text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                   <Phone size={18} className="text-indigo-600 sm:w-5 sm:h-5" />
                   Contact Details
                </h4>
                <div className="space-y-5 sm:space-y-6">
                    <DetailItem label="Email Address" value={user?.email} icon={Mail} />
                    <DetailItem label="Phone Number" value={`+91 ${user?.phoneNumber}`} icon={Phone} />
                    <DetailItem label="Primary Location" value={user?.address} icon={MapPin} />
                </div>
            </div>

            <div className="bg-rose-500 p-7 sm:p-8 rounded-[28px] sm:rounded-[40px] text-white shadow-2xl shadow-rose-200 relative overflow-hidden">
                <HeartPulse size={100} className="absolute -right-8 -bottom-8 opacity-10" />
                <h4 className="text-base sm:text-lg font-black mb-6">Emergency Protocol</h4>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-bold text-rose-100 uppercase tracking-widest mb-1">Critical Allergies</p>
                    <p className="text-xs sm:text-sm font-black">{user?.emergencyProtocol?.criticalAllergies ?? 'N/A'}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-bold text-rose-100 uppercase tracking-widest mb-1">Emergency Contact</p>
                    <p className="text-xs sm:text-sm font-black">{user?.emergencyProtocol?.emergencyContact?.name ?? 'N/A'}</p>
                    <p className="text-[10px] opacity-70">{user?.emergencyProtocol?.emergencyContact?.phoneNumber ?? 'N/A'}</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-4 bg-white text-rose-600 rounded-2xl font-black text-xs sm:text-sm transition-all hover:bg-rose-50 active:scale-95 shadow-lg"
                 disabled={!user?.emergencyProtocol?.emergencyContact?.phoneNumber}
                >
                  EMERGENCY SOS DIAL
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile
