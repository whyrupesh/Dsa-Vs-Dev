export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="blob absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-white/10 blur-[120px]" />
      <div
        className="blob absolute right-[-10%] top-[10%] h-[36rem] w-[36rem] rounded-full bg-gray-400/15 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="blob absolute bottom-[-15%] left-[20%] h-[34rem] w-[34rem] rounded-full bg-gray-500/10 blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent,_#000000_70%)]" />
    </div>
  );
}
