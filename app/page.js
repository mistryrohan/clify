"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-500 flex items-center justify-center">
        <div className="p-10 bg-gray-700 shadow rounded text-center">
          <h1 className="text-xl mb-5">welcome to cli-fy</h1>

          <button
            onClick={() => signIn("spotify", {callbackUrl: "/dashboard"})}
            className="px-4 py-2 bg-green-700 text-black rounded"
          >
            log in with spotify
          </button>

        </div>
      </div>
    );
  }

}
