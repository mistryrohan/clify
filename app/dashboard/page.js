'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button, TextField, Radio, RadioGroup, FormControlLabel } from "@mui/material";

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
        <div className="flex flex-col md:flex-row justify-center mt-16 md:mt-56 gap-14 mx-auto max-w-4xl px-4">

          <div className="bg-black text-white sm:w-1/2 w-full p-4 rounded-md">
            <ul className="list-none space-y-2">
              {topItems.map((item, index) => (
                <li key={item.id}>
                  <strong>{index + 1}. {item.name}</strong>
                  {!viewArtists && item.artists && (
                    <span> by {item.artists[0]?.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">

          <div>
            <p>my top</p>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue="5"
              variant="filled"
              size="small"
            />
          </div>

            <Button
              variant="contained"
              onClick={() => setViewArtists(prev => !prev)}
              style={{ marginBottom: 16 }}
            >
            {viewArtists ? "artists" : "songs"}
            </Button>

      
            <p>in the past</p>
            <select
              className="rounded px-2 py-1"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="short_term">month</option>
              <option value="medium_term">6 months</option>
              <option value="long_term">year</option>
            </select>

          </div>
        </div>
      );
}