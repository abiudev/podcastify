import { useQuery } from "@tanstack/react-query";
import { getTrendingPodcasts } from "../services/podcastIndexService";
import ShowCard from "./ShowCard.jsx";
import Loader from "./Loader.jsx";
import useStore from "../store/useStore";

const TrendingPodcasts = () => {
  const setCurrentTrack = useStore((state) => state.setCurrentTrack);

  const { data: podcasts, isLoading, error } = useQuery({
    queryKey: ["trendingPodcasts"],
    queryFn: () => getTrendingPodcasts(10),
  });

  const handlePlay = (podcast) => {
    setCurrentTrack({
      id: podcast.id,
      type: 'pdci',
      url: podcast.url,
      image: podcast.image,
      title: podcast.title
    });
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading trending podcasts: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="text-center font-roboto-condensed">
        <h1 className="text-4xl font-bold">
          Here is Our <span className="text-green-400">Trending </span> Podcast{" "}
          Selection
        </h1>
        <p className="font-light">
          Or You can <span className="font-bold text-green-400">Search</span>{" "}
          Your Favorite Podcasts Using Our Search function
        </p>
      </div>
      <div className="pb-24">
        {isLoading ? (
          <Loader className="flex items-center justify-center h-screen" />
        ) : (
          <ShowCard shows={podcasts || []} onPlay={handlePlay} />
        )}
      </div>
    </>
  );
};

export default TrendingPodcasts;
