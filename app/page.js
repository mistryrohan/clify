"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="relative min-h-screen w-full font-mono text-gray-100 bg-gray-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-indigo-500/10 to-transparent blur-2xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="p-px rounded-xl bg-gradient-to-r from-emerald-500/40 via-indigo-500/40 to-purple-500/40 shadow-2xl">
            <div className="rounded-xl bg-gray-900/80 backdrop-blur-sm p-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow">
                cli-fy
              </h1>

              <p className="text-sm md:text-base mb-8 uppercase tracking-wide text-gray-300">
                view your top songs &amp; artists
              </p>

              <button
                onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
                className="relative px-6 py-3 font-semibold text-black bg-green-500 rounded hover:bg-emerald-400 active:scale-95 transition shadow-lg"
              >
                log in with spotify
              </button>
            </div>
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 w-full py-3 flex justify-center gap-8">
            <a
              href="https://www.rohanmistry.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <img
                src="WebsiteIcon.png"
                alt="Website"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/mistry-rohan/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <img
                src="/LinkedInIcon.png"
                alt="LinkedIn"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </a>
            <a
              href="https://github.com/mistryrohan"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <img
                src="/GithubIcon.png"
                alt="Github"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </a>
          </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 font-mono">
      <h1 className="text-2xl mb-4">Welcome, {session.user?.name}!</h1>

      <button
        onClick={() => signOut()}
        className="px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:scale-95 transition shadow"
      >
        Sign Out
      </button>
    </main>
  );
}
