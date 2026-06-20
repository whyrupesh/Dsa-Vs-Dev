import Link from "next/link";

export function NavBar() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
      <Link href="/" className="text-sm font-bold tracking-tight">
        compare<span className="text-gray-400">Code</span>
      </Link>
      <a
        href="https://github.com/whyrupesh/Dsa-Vs-Dev"
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10"
      >
        Star on GitHub
      </a>
    </header>
  );
}
