export default function Loading() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-6 py-12">
      <div className="w-full max-w-md animate-pulse rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white/10" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-white/10" />
            <div className="h-3 w-24 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-6 h-10 w-48 rounded bg-white/10" />
        <div className="mt-3 h-3 w-40 rounded bg-white/10" />
        <div className="mt-4 h-3 w-full rounded-full bg-white/10" />
        <div className="mt-6 grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
      <div className="text-xs text-white/40">Crunching your stats…</div>
    </main>
  );
}
