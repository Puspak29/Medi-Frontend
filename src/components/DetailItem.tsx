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

export default DetailItem;