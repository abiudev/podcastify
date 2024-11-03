import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaPlayCircle, FaPlus, FaRegShareSquare } from "react-icons/fa";
import Alerts from "./Alerts.jsx";
import Share from "./Share.jsx";

export default function ShowCard({
  shows,
  onPlay,
  setFavorites,
  addToFavorites,
  Share,
}) {
  const [alert, setAlert] = useState(false);
  const [selectedShow, setSelectedShow] = useState();

  const handleFavsClick = (show) => {
    addToFavorites(show.id);
    setSelectedShow(show);
    console.log(show.title);
    setAlert(true);
  };

  return (
    <>
      {alert && (
        <Alerts show={selectedShow} onDismiss={() => setAlert(false)} />
      )}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 px-4">
        {shows.length > 0 ? (
          shows.map((show) => (
            <Card
              key={show.id}
              className="w-full max-w-[18rem] rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={
                  show.image ||
                  (show.images && show.images.length > 0
                    ? show.images[0].url
                    : "https://via.placeholder.com/150")
                }
                alt={show.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 bg-gray-200 shadow-md rounded-b-lg flex-1">
                <Typography variant="h6" className="font-bold text-gray-800">
                  {show.name}
                </Typography>
                <Typography className="mt-2 text-sm text-gray-600 h-20 overflow-hidden">
                  {show.description.length > 100
                    ? `${show.description.substring(0, 100)}...`
                    : show.description}
                </Typography>
              </div>
              <div className="p-1 flex justify-around items-center bg-gray-200 relative">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => onPlay(show)}
                    className="text-green-400 hover:text-blue-700"
                  >
                    <FaPlayCircle size={20} />
                  </button>
                  <span className="border rounded-md border-gray-400 text-xs px-2 mt-1">
                    Play
                  </span>
                </div>
                <div className="flex flex-col items-center relative">
                  <button
                    onClick={() => handleFavsClick(show)}
                    className="text-green-400 hover:text-blue-700"
                  >
                    <FaPlus size={20} />
                  </button>
                  <span className="border rounded-md border-gray-400 text-xs px-2 mt-1">
                    Add
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      Share;
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaRegShareSquare size={20} />
                  </button>
                  <span className="border rounded-md border-gray-400 text-xs px-2 mt-1">
                    Share
                  </span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Typography variant="h6" className="text-center"></Typography>
        )}
      </div>
    </>
  );
}
