export default function MetricCard({ label, value, previous, icon }: any) {
  return (
    <div className="bg-white px-3 md:px-6 py-1.5 md:py-3 rounded md:rounded-xl border border-black/15 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <span className="text-[10px] md:text-sm font-semibold text-gray-500 uppercase tracking-tight">
          {label}
        </span>
        {/* Reduced padding on mobile (p-1.5) vs desktop (md:p-2) */}
        <div className="p-1.5 md:p-2 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-1">
        <span className="text-xl md:text-4xl font-bold text-gray-900 leading-none">
          {value}
        </span>
      </div>

      <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">
        {previous}
      </p>
    </div>
  );
}
