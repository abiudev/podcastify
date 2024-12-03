import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaPlayCircle, FaPlus, FaRegShareSquare } from "react-icons/fa";
import SpAlerts from "./SpotifyAlerts.jsx";
import SpotifyPlayer from "./SpotifyPlayer.jsx";

export default function SptifyShowCard({
	shows,
	onPlay,
	setFavorites,
	handleSpotifyFavorites,
	Share,
	user,
	accessToken,
	uri,
	isSearch,
}) {
	const [alert, setAlert] = useState(false);
	const [alertShow, setAlertShow] = useState();
	const [selectedSpShow, setSelectedSpShow] = useState(null);
	const [currentSpPodcast, setCurrentSpPodcast] = useState([]);
	const [favShows, setFavShows] = useState(false);

	const handleSpotifyPlay = (ids) => {
		const showToPlay = shows.find((p) => p.id === ids);
		setSelectedSpShow(showToPlay);
		setCurrentSpPodcast([...currentSpPodcast, showToPlay]);
		console.log("You are playing", showToPlay.id);
	};

	return (
		<>
			{alert && <SpAlerts show={alertShow} onDismiss={() => setAlert(false)} />}

			<div className="mt-6 z-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 px-4">
				{shows.length > 0 ? (
					shows.map((show) => (
						<Card
							key={show.id}
							className="w-full max-w-[18rem] rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
						>
							<div className="relative">
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
								<div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>

								<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
									<button
										onClick={() => handleSpotifyPlay(show.id)}
										className="text-white hover:text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-green-500 transition-all duration-300 shadow-md"
									>
										<FaPlayCircle size={40} />
									</button>
									<span className="text-xs px-2 mt-1 text-white">Play</span>
								</div>
							</div>

							<div className="p-4 bg-gray-200 shadow-md rounded-b-lg flex-1">
								<Typography variant="h6" className="font-bold text-gray-800">
									{show.title}
								</Typography>
								<Typography className="mt-2 text-sm text-gray-600 h-20 overflow-hidden">
									{show.description.length > 100
										? `${show.description.substring(0, 100)}...`
										: show.description}
								</Typography>
							</div>
						</Card>
					))
				) : (
					<Typography variant="h6" className="text-center">
						No shows available
					</Typography>
				)}
			</div>
			{selectedSpShow && <SpotifyPlayer showId={selectedSpShow.id} />}
		</>
	);
}
