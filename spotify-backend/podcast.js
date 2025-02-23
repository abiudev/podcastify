import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  spotifyId: String,
});

export default mongoose.model("Podcast", PodcastSchema);
