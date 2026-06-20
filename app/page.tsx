import { UsernameForm } from "@/components/UsernameForm";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-20 text-center">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        Free &middot; takes 5 seconds
      </div>

      <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
        Are you a{" "}
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Shipper
        </span>{" "}
        or a{" "}
        <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
          Solver
        </span>
        ?
      </h1>

      <p className="max-w-md text-sm text-white/60 sm:text-base">
        Drop your GitHub and LeetCode usernames. Get a slick, shareable card
        that settles the debate — and brag rights over your friends.
      </p>

      <UsernameForm />
    </main>
  );
}
