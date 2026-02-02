export default function MetricCard({ label, value, previous, icon }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 px-3 md:px-6 py-1.5 md:py-3 rounded-lg md:rounded-xl border border-black/15 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <span className="text-[10px] md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-tight">
          {label}
        </span>

        {/* Icon Container with dark mode background */}
        <div className="p-1.5 md:p-2 bg-gray-50 dark:bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300">
          {icon}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-1">
        <span className="text-xl md:text-4xl font-bold text-gray-900 dark:text-white leading-none">
          {value}
        </span>
      </div>

      <p
        className="text-[10px] md:text-xs text-gray-400 dar
      k:text-gray-500 font-medium truncate"
      >
        {previous}
      </p>
    </div>
  );
}
