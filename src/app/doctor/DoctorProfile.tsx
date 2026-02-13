import { Briefcase, Building, Edit3, Mail, MapPin, Phone, Save, Settings, Share2, Stethoscope, User, X, Award, Users, Activity, Star, History } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import { DetailItem } from '../../components';
import { toast } from 'react-toastify';
import { updateDoctorProfile } from '../../services/doctorServices';
import * as Icons from 'lucide-react';

type IconName = keyof typeof Icons;

interface BadgeIconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const BadgeIcon= ({ name, size = 24, className }: BadgeIconProps) => {
  const IconComponent = Icons[name] as unknown as React.ComponentType<any>;

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
}

const StatCard = ({ value, label, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
    <div className={`p-4 rounded-2xl ${color.bg} ${color.text}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

const EditDoctorModal = ({ isOpen, onClose, initialData }: any) => {
  const { setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    hospitalAffiliation: initialData?.hospitalAffiliation || '',
    specialization: initialData?.specialization || '',
    phoneNumber: initialData?.phoneNumber || '',
    address: initialData?.address || '',
    bio: initialData?.bio || '',
  });

  if (!isOpen) return null;

  const handleSave = async (e: any) => {
    e.preventDefault();
    const res = await updateDoctorProfile(formData);
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
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900">Edit Professional Profile</h3>
            <p className="text-xs text-slate-500 font-medium">Update your credentials and public bio.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
                  <Building size={12} className="text-indigo-600" /> Hospital
                </label>
                <input 
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.hospitalAffiliation}
                  onChange={(e) => setFormData({...formData, hospitalAffiliation: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
                  <Briefcase size={12} className="text-indigo-600" /> Specialty
                </label>
                <input 
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
                  <Phone size={12} className="text-indigo-600" /> Phone Number
                </label>
                <input 
                  type="tel"
                  placeholder="1234567890"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({
                    ...formData, 
                    phoneNumber: e.target.value
                  })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin size={12} className="text-indigo-600" /> Location
                </label>
                <input 
                  type="text"
                  placeholder="Suite/Level/Building"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({
                    ...formData, 
                    address: e.target.value
                  })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
                Professional Bio
              </label>
              <textarea 
                rows={4}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none transition-all"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </div>
        </form>

        <div className="p-6 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all text-sm">Cancel</button>
          <button onClick={handleSave} className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 text-sm">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorProfile = () => {
  const { currentUser } = useAuth();
  const doc = currentUser;
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="min-h-screen max-w-full bg-slate-50 overflow-y-auto pb-20">
      <EditDoctorModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} initialData={doc} />

      {/* Header / Hero Section */}
      <div className="h-[40vh] bg-indigo-950 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-indigo-950/40 to-transparent" />
        
        <div className="absolute top-0 inset-x-0 p-6 sm:p-8 flex items-center justify-between z-20">
          <div className="flex gap-2">
             <button className="p-2.5 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 border border-white/20 text-white">
                <Share2 size={18} />
             </button>
             <button className="p-2.5 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 border border-white/20 text-white">
                <Settings size={18} />
             </button>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 pb-10">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-[40px] bg-white p-2 shadow-2xl relative shrink-0">
              <div className="w-full h-full rounded-[34px] bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-50 overflow-hidden">
                <User size={60} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-indigo-600 rounded-xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                <Stethoscope size={18} />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1 min-w-0">
               <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                 <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{doc?.name}</h2>
                 <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black">
                   <Star size={12} fill="currentColor" /> {doc?.rating || 'N/A'}
                 </span>
               </div>
               <p className="text-lg sm:text-2xl text-slate-600 font-bold flex items-center justify-center md:justify-start gap-3">
                 <span className="truncate">{doc?.specialization}</span>
                 <span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></span>
                 <span className="text-indigo-600 truncate">{doc?.hospitalAffiliation}</span>
               </p>
            </div>
            
            <div className="w-full md:w-auto">
              <button onClick={() => setIsEditModalOpen(true)} className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Edit3 size={20} /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard value={doc?.patientCount} label="Total Patients" icon={Users} color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }} />
          <StatCard value={doc?.experience} label="Exp. Years" icon={Award} color={{ bg: 'bg-indigo-50', text: 'text-indigo-600' }} />
          <StatCard value={doc?.rating ? doc?.rating * 200 : 'N/A'} label="Patient Satisfaction" icon={Activity} color={{ bg: 'bg-rose-50', text: 'text-rose-600' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex border-b border-slate-200 gap-8">
              {['Overview', 'Badges'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                    activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />}
                </button>
              ))}
            </div>

            {activeTab === 'Overview' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-[40px] border border-slate-200">
                  <h4 className="text-xl font-black text-slate-900 mb-4">Professional Biography</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{doc?.bio}</p>
                </div>
              </div>
            )}
            {activeTab === 'Badges' && (
              <div className="bg-white p-8 rounded-[40px] border border-slate-200 animate-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <History size={24} className="text-indigo-600" /> Professional Milestones
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {doc?.badges?.map((milestone) => (
                    <div key={milestone._id} className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all hover:shadow-lg group">
                      <div className={`w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                        <BadgeIcon name={milestone.badge.icon} size={32} />
                      </div>
                      <p className="text-sm font-black text-slate-900 leading-tight">
                        {milestone.badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Contact Section (Replaced Consulting Hub) */}
            <div className="bg-white p-7 sm:p-8 rounded-[28px] sm:rounded-[40px] border border-slate-200 shadow-sm">
                <h4 className="text-base sm:text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                   <Phone size={18} className="text-indigo-600 sm:w-5 sm:h-5" />
                   Contact Details
                </h4>
                <div className="space-y-5 sm:space-y-6">
                    <DetailItem label="Email Address" value={doc?.email} icon={Mail} />
                    <DetailItem label="Phone Number" value={`+91 ${doc?.phoneNumber}`} icon={Phone} />
                    <DetailItem label="Primary Location" value={doc?.address} icon={MapPin} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile
