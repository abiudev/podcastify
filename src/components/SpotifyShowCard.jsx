import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaPlayCircle } from "react-icons/fa";
import useStore from "../store/useStore";

export default function SptifyShowCard({ shows }) {
  const setCurrentTrack = useStore((state) => state.setCurrentTrack);

  const handleSpotifyPlay = (id) => {
    const showToPlay = shows.find((p) => p.id === id);
    if (!showToPlay) return;
    
    setCurrentTrack({
      id: showToPlay.id,
      type: 'spotify',
      title: showToPlay.name || showToPlay.title,
      image: showToPlay.images?.[0]?.url || showToPlay.image,
      description: showToPlay.description
    });
  };

  return (
    <>
      <div className="z-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 px-4">
        {shows && shows.length > 0 ? (
          shows.map((show) => (
            <Card
              key={show.id}
              className="w-full max-w-[18rem] rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300"
            >
              <div className="relative">
                <img
                  src={
                    show.images && show.images.length > 0
                      ? show.images[0].url
                      : (show.image || "https://via.placeholder.com/150")
                  }
                  alt={show.name || show.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/30 rounded-t-lg" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={() => handleSpotifyPlay(show.id)}
                    className="text-white bg-green-500 rounded-full p-2 shadow-xl hover:scale-110 transition-transform"
                  >
                    <FaPlayCircle size={48} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white rounded-b-lg flex-1">
                <Typography variant="h6" className="font-bold text-gray-900 truncate">
                  {show.name || show.title}
                </Typography>
                <Typography className="mt-1 text-xs text-gray-500 h-12 overflow-hidden line-clamp-3">
                  {show.description || "No description available."}
                </Typography>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
             <Typography variant="h5" color="blue-gray">
                No shows found
             </Typography>
             <Typography color="gray" className="font-normal">
                Try searching for something else.
             </Typography>
          </div>
        )}
      </div>
    </>
  );
}

