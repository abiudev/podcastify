import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";
import cors from "cors";
import process from "process";
import { Buffer } from "buffer";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Podcast from "./models/podcast.js"; 

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 5000;


console.log("CLIENT_ID:", CLIENT_ID);
console.log("CLIENT_SECRET:", CLIENT_SECRET);


app.post("/api/token", async (req, res) => {
  try {
    console.log("Fetching Spotify Token...");
    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Missing CLIENT_ID or CLIENT_SECRET in environment variables.");
    }

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    console.log("Token received:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching token:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  
  try {
    const tokenResponse = await axios.post("https://accounts.spotify.com/api/token", 
      new URLSearchParams({ grant_type: "client_credentials" }),
      { headers: { Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}` } }
    );
    
    const accessToken = tokenResponse.data.access_token;
    const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=show`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const podcasts = searchResponse.data.shows.items.map((show) => ({
      name: show.name,
      description: show.description,
      image: show.images[0]?.url,
      spotifyId: show.id,
    }));

    await Podcast.insertMany(podcasts, { ordered: false }).catch(() => {}); // Avoid duplicate errors

    res.json({ shows: podcasts });
  } catch (error) {
    console.error("Error fetching shows:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));