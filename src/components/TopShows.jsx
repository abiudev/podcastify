import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ShowCard from "./ShowCard.jsx";
import Loader from "./Loader.jsx";
import PodcastPlayer from "./player.jsx";

const TopShows = ({ favorites, setFavorites }) => {
	const [podcasts, setPodcasts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentPodcast, setCurrentPodcast] = useState(null);

	useEffect(() => {
		const fetchTrendingPodcasts = async () => {
			const apiKey = "TYQBYW6KKSSUHGCGGVJE";
			const apiSecret = "ANV2hHcFbQ6#MXqQYaJ$qN5R3jyc^vFjwefwh6Cg";

			const authDate = Math.floor(Date.now() / 1000);
			const sinceDate = authDate - 86400;
			const authString = apiKey + apiSecret + authDate;
			const authHeader = CryptoJS.SHA1(authString).toString(CryptoJS.enc.Hex);

			const myHeaders = new Headers();
			myHeaders.append("User-Agent", "Podcastify");
			myHeaders.append("X-Auth-Date", authDate);
			myHeaders.append("X-Auth-Key", apiKey);
			myHeaders.append("Authorization", authHeader);

			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			try {
				const response = await fetch(
					`https://api.podcastindex.org/api/1.0/podcasts/trending?max=50&lang=en&since=${sinceDate}&pretty=true`,
					requestOptions
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();

				const cleanedPodcasts = result.feeds.map((podcast) => ({
					...podcast,
					description: podcast.description.replace(/<\/?[^>]+(>|$)/g, ""),
				}));

				setPodcasts(cleanedPodcasts);
				isSpotify: false;

				setLoading(false);
				const ids = result.feeds.map((feed) => feed.id);
			} catch (error) {
				setError(error.message);
				console.error("Error fetching podcasts:", error);
			}
		};

		fetchTrendingPodcasts();
	}, []);

	const handlePlay = (podcast) => {
		setCurrentPodcast(podcast);
	};
	const addToFavorites = (ids) => {
		const showToAdd = podcasts.find((p) => p.id === ids);
		setFavorites([...favorites, { ...showToAdd, isSpotify: false }]);
	};

	return (
		<>
			<div className="text-center  font-roboto-condensed ">
				<h1 className=" text-4xl font-bold">
					Here is Our <span className=" text-green-400">Trending </span> Podcast{" "}
					Selection
				</h1>
				<p className="font-light">
					Or You can <span className=" font-bold text-green-400">Search</span>{" "}
					Your Favorite Podcats Using Our Search function
				</p>
			</div>
			<div className="pb-24">
				{loading ? (
					<Loader className="flex items-center justify-center h-screen" />
				) : (
					<ShowCard
						shows={podcasts}
						addToFavorites={addToFavorites}
						onPlay={handlePlay}
						isSearch={false}
					/>
				)}
			</div>

			{currentPodcast && (
				<PodcastPlayer url={currentPodcast.url} img={currentPodcast.image} />
			)}
		</>
	);
};

export default TopShows;
