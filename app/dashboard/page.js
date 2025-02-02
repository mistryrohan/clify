'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import html2canvas from "html2canvas";

export default function Dashboard() {
    const { data: session, status } = useSession();

    const [topItems, setTopItems] = useState([]);
    const [timeRange, setTimeRange] = useState('long_term')
    const [viewArtists, setViewArtists] = useState(true); 
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        const fetchTopItems = async () => {
            if (!session?.accessToken) return;

            const endpoint = viewArtists ? 'artists' : 'tracks';
            const url = `https://api.spotify.com/v1/me/top/${endpoint}?limit=${limit}&time_range=${timeRange}`;


            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });

            const data = await res.json();
            setTopItems(data.items || []);
        }

        fetchTopItems();
    }, 
    [session, viewArtists, timeRange, limit]);

    const handleLimitChange = (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 5;
      if (val < 5) val = 5;
      if (val > 10) val = 10;
      setLimit(val);
    };

    // TODO make a loading.js file
    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (!session) {
        redirect("/");
    }

    const username = session?.user?.name || "username";

    return (
        <div className="min-h-screen w-full bg-gray-800 text-gray-100 font-mono flex items-center justify-center p-4">
          
          {/* Main inner formatting */}
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full mx-auto">
            <div className="bg-black w-full md:w-1/2 rounded-md overflow-hidden border border-gray-700 shadow-lg">
              <div className="bg-gray-800 px-3 py-2 flex justify-between items-center">
                <span className="font-bold">cli-fy</span>
                <div className="space-x-2">
                  <button className="hover:bg-gray-700 px-2 py-1 rounded">-</button>
                  <button className="hover:bg-gray-700 px-2 py-1 rounded">▢</button>
                  <button className="hover:bg-red-600 px-2 py-1 rounded">x</button>
                </div>
              </div>

            {/* TODO change timerange to be dictionary mapped to names like 6 months */}
              <div className="p-4 text-white">
                <pre className="mb-2">
                {`cd /Users/${username}/${viewArtists ? 'top_artists' : 'top_songs'}/${timeRange}
  ls`}
                </pre>

                <ul className="list-none space-y-2">
                  {topItems.map((item, index) => (
                    <li key={item.id}>
                      <strong>
                        {index + 1}. {item.name}
                      </strong>
                      {!viewArtists && item.artists && (
                        <span> by {item.artists[0]?.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
             </div>
            </div>

            <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">
              <div>
                <p>my top</p>
                <TextField
                  type="number"
                  variant="filled"
                  size="small"
                  value={limit}
                  onChange={handleLimitChange}
                  sx={{
                    width: "80px",
                    backgroundColor: "#fff",
                    "& .MuiFilledInput-input": {
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    },
                  }}
                />
              </div>

              <div className="flex flex-col">
                <ButtonGroup>
                  <Button
                    variant={viewArtists ? "contained" : "outlined"}
                    onClick={() => setViewArtists(true)}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    artists
                  </Button>
                  <Button
                    variant={!viewArtists ? "contained" : "outlined"}
                    onClick={() => setViewArtists(false)}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    songs
                  </Button>
                </ButtonGroup>
              </div>
          
              <div className="flex flex-col">
                <p className="font-semibold">in the past</p>
                <ButtonGroup>
                  <Button
                    variant={timeRange === "short_term" ? "contained" : "outlined"}
                    onClick={() => setTimeRange("short_term")}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    month
                  </Button>
                  <Button
                    variant={timeRange === "medium_term" ? "contained" : "outlined"}
                    onClick={() => setTimeRange("medium_term")}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    6 months
                  </Button>
                  <Button
                    variant={timeRange === "long_term" ? "contained" : "outlined"}
                    onClick={() => setTimeRange("long_term")}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    year
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          
        </div>   
      );
}