import apiClient from '../utils/apiClient';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

let accessToken = null;
let tokenExpirationTime = 0;

export const getAccessToken = async () => {
    const now = Date.now();
    if (accessToken && now < tokenExpirationTime) {
        return accessToken;
    }

    const options = {
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    try {
        const response = await apiClient(options);
        accessToken = response.data.access_token;
       
        tokenExpirationTime = now + (response.data.expires_in || 3600) * 1000 - 100000;
        return accessToken;
    } catch (error) {
        console.error("Error fetching Spotify access token:", error);
        throw error;
    }
};

export const searchShows = async (query, limit = 20) => {
    const token = await getAccessToken();
    try {
        const { data } = await apiClient.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: "show",
                market: "US",
                limit,
            },
        });
        return data.shows.items;
    } catch (error) {
        console.error("Error searching Spotify shows:", error);
        throw error;
    }
};
