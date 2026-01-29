import CryptoJS from "crypto-js";
import apiClient from "../utils/apiClient";

const apiKey = import.meta.env.VITE_PDCI_API_KEY;
const apiSecret = import.meta.env.VITE_PDCI_SECRET_KEY;

const getAuthHeaders = () => {
    const authDate = Math.floor(Date.now() / 1000);
    const authString = apiKey + apiSecret + authDate;
    const authHeader = CryptoJS.SHA1(authString).toString(CryptoJS.enc.Hex);

    return {
        "User-Agent": "Podcastify",
        "X-Auth-Date": authDate.toString(),
        "X-Auth-Key": apiKey,
        "Authorization": authHeader,
    };
};

export const getTrendingPodcasts = async (max = 10, lang = 'en') => {
    const authDate = Math.floor(Date.now() / 1000);
    const sinceDate = authDate - 86400;
    
    try {
        const response = await apiClient.get('https://api.podcastindex.org/api/1.0/podcasts/trending', {
            headers: getAuthHeaders(),
            params: {
                max,
                lang,
                since: sinceDate,
                pretty: true
            }
        });
        
        return response.data.feeds.map((podcast) => ({
            ...podcast,
            description: podcast.description.replace(/<\/?[^>]+(>|$)/g, ""),
        }));
    } catch (error) {
        console.error("Error fetching trending podcasts:", error);
        throw error;
    }
};
