"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-400 flex items-center justify-center">
        <div className="p-10 bg-gray-600 shadow rounded text-center">
          <h1 className="text-xl mb-5">welcome to clify</h1>
          <p className="mb-5">Please login to continue.</p>
          <button
            onClick={() => signIn("spotify")}
            className="px-4 py-2 bg-green-700 text-black rounded"
          >
            Log in with Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-10 bg-white shadow rounded text-center">
        <h1 className="text-xl mb-5">Hello, {session.user.name}!</h1>
        <p className="mb-5">
          You are logged in.
        </p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
