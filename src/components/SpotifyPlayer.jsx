import { Spotify } from "react-spotify-embed";

export default function SpotifyPlayer({ showId }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800">
      <Spotify
        className="mx-auto"
        width="100%"
        height="80px"
        link={`https://open.spotify.com/show/${showId}`}
      />
    </div>
  );
}
