import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./components/Header.jsx";
import ToggleProvider from "./Contexts/ToggleContext.jsx";
import TopShows from "./components/TopShows.jsx";
import SpotifyShowCard from "./components/SpotifyShowCard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";

const CLIENT_ID = "1304c4c46d2d4695bd2fd9f0eacae3ea";
const CLIENT_SECRET = "dc9abd9b3d064c1a8a3e07b43f436104";

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [accessToken, setAccessToken] = useState(null);
	const [shows, setShows] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [id, setId] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAccessToken = async () => {
			const options = {
				method: "POST",
				url: "https://accounts.spotify.com/api/token",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				data: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
			};

			try {
				const response = await Axios(options);
				setAccessToken(response.data.access_token);
			} catch (error) {
				console.error("Error fetching access token:", error);
			}
		};

		fetchAccessToken();
	}, []);

	const handleSearchChange = async (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (!term) {
			setSuggestions([]);
			return;
		}

		try {
			const { data } = await Axios.get("https://api.spotify.com/v1/search", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				params: {
					q: term,
					type: "show",
					market: "US",
					limit: 5,
				},
			});

			setSuggestions(data.shows.items);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		setSearchTerm(suggestion.name);
		setSuggestions([]);
		handleSearchClick();
	};

	const handleSearchClick = async () => {
		if (!searchTerm || !accessToken) return;

		try {
			const { data } = await Axios.get("https://api.spotify.com/v1/search", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				params: {
					q: searchTerm,
					type: "show",
					market: "US",
				},
			});

			setShows(data.shows.items);
			isSpotify: true;
			console.log(data.shows.items);
			navigate("/results", {
				state: { shows: data.shows.items },
			});
		} catch (error) {
			console.error("Error fetching shows:", error);
		}
	};

	useEffect(() => {
		const ids = shows.map((show) => show.id);
		setId(ids);
		console.log(ids);
	}, [shows]);

	return (
		<ToggleProvider>
			<div>
				<Header
					handleSearchChange={handleSearchChange}
					handleSearchClick={handleSearchClick}
					searchTerm={searchTerm}
					suggestions={suggestions}
					onSuggestionClick={handleSuggestionClick}
				/>
				<Routes>
					<Route path="/trending" element={<TopShows />} />

					<Route
						path="/results"
						element={
							<SpotifyShowCard
								id={id}
								accessToken={accessToken}
								shows={shows}
								isSpotify={true}
							/>
						}
					/>
				</Routes>
			</div>
		</ToggleProvider>
	);
}
