export function StatBadge({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center">
      <div className="text-base font-semibold text-white sm:text-lg">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-white/45">
        {label}
      </div>
    </div>
  );
}
