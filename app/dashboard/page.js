'use client'

import { useSession } from "next-auth/react";

// TODO include a logout here, onClick={() => signOut()}
export default function Dashboard() {
    const { data: session, status } = useSession();

    // TODO make a loading.js file
    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (!session) {
        redirect("/");
    }

    return (
        <div>
          <h1>Welcome to your Dashboard, {session.user?.name}!</h1>
          {/* You can fetch Spotify data with session.accessToken */}
        </div>
      );
}