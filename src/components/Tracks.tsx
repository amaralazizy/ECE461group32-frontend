import  {useState} from "react";
import { getTracks } from "../api";
import { cn } from "../lib/utils";

type TracksProps = {
  className?: string;
};

export default function Tracks({className}:TracksProps): JSX.Element {
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState("");

    const handleGetTracks = async () => {
        try {
            const data = await getTracks();
            if (data) {
                setTracks(data.plannedTracks);
            } else {
                setTracks([]);
                setError("No tracks found");
            }
        } catch (err) {
            setError("An error occurred while fetching tracks");
            console.error(err);
        }
    };
    
    return (
      <div className="flex flex-col gap-5">
        <button
          onClick={handleGetTracks}
          className={cn("bg-blue-500 text-white p-3 rounded m-8", className)}
        >
          Get Tracks
        </button>
        {error ? (
          <h2 className="text-red-500 italic">{error}</h2>
        ) : (
          tracks.map((track) => (
            <div className="text-white">
              <h2>Track: {track}</h2>
            </div>
          ))
        )}
      </div>
    );
}