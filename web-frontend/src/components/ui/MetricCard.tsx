export default function MetricCard({ label, value, previous, icon }: any) {
  return (
    <div className="bg-white px-6 py-3 rounded-xl border border-black/15 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">
          {label}
        </span>
        <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
      </div>
      <div className="flex items-end gap-3 mb-1">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
      </div>
      <p className="text-xs text-gray-400 font-medium">{previous}</p>
    </div>
  );
}
