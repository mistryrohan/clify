'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";

// TODO include a logout here, onClick={() => signOut()}
// TODO allow user to have a limit filter (min 1)
// Usememo somehow so a lot of requests arent made
export default function Dashboard() {
    const { data: session, status } = useSession();
    const [topItems, setTopItems] = useState([]);
    const [timeRange, setTimeRange] = useState('long_term')
    const [viewArtists, setViewArtists] = useState(true); 

    useEffect(() => {
        const fetchTopItems = async () => {
            const endpoint = viewArtists ? 'artists' : 'tracks';
            const url = `https://api.spotify.com/v1/me/top/${endpoint}?limit=5&time_range=${timeRange}`;


            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`, // TODO wait for session is loading
                },
            });

            const data = await res.json();
            setTopItems(data.items || []);
        }

        fetchTopItems();
    }, 
    [session, viewArtists, timeRange]);

    // TODO make a loading.js file
    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (!session) {
        redirect("/");
    }

    return (
        <div style={{ padding: "20px" }}>
          <h1>Your Top {viewArtists ? "Artists" : "Songs"}</h1>

          <Button
            variant="contained"
            onClick={() => setViewArtists(prev => !prev)}
            style={{ marginBottom: 16 }}
          >
            Switch to {viewArtists ? "Artists" : "Songs"}
          </Button>

    
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="short_term">past month</option>
            <option value="medium_term">past 6 months</option>
            <option value="long_term">past year</option>
          </select>
    
          <ul style={{ marginTop: "20px" }}>
            {topItems.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                {!viewArtists && item.artists && (
                  <span> by {item.artists[0]?.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
}