# podcastify
# Podcastify

Podcastify is a React web app that allows users to explore and play podcasts. It fetches trending podcasts from the Podcast Index API and enables users to search for any podcast using a search function with autosuggestions powered by the Spotify API. Users can listen to podcasts without signing up, and the app supports background playback.

## Features

- Browse trending podcasts fetched from the Podcast Index API.
- Search for podcasts with real-time suggestions using the Spotify API.
- Play podcasts directly without requiring user signup.
- Background playback support for seamless listening.

## Live Demo

You can check out the live demo here: [Podcastify](https://podcastify-v0.vercel.app/) 
## Getting Started

### Prerequisites

To run this project locally, you need:

- Node.js installed on your machine.
- A package manager (npm or yarn).
- API keys for the Podcast Index and Spotify APIs.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abiudev/podcastify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd podcastify
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

   Or, if you prefer yarn:

   ```bash
   yarn install
   ```

### Setting Up Environment Variables

1. Create a `.env` file in the root directory.
2. Add the following environment variables:

   ```env
   VITE_PDCI_API_KEY=your_podcast_index_api_key
   VITE_PDCI_SECRET_KEY=your_podcast_index_secret_key

   VITE_SPFY_API_KEY=your_spotify_api_key
   VITE_SPFY_SECRET_KEY=your_spotify_secret_key
   ```

### Obtaining API Keys

- **Podcast Index API:**
  1. Visit [Podcast Index API](https://podcastindex.org/api).
  2. Sign up and obtain your API Key and Secret Key.

- **Spotify API:**
  1. Go to [Spotify for Developers](https://developer.spotify.com/).
  2. Log in or create an account.
  3. Create a new application to obtain your Client ID and Secret Key.

### Running the App

1. Start the development server:

   ```bash
   npm run dev
   ```

   Or, with yarn:

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:5173` to view the app.

## Technologies Used

- **Frontend:** React, Vite
- **State Management:** Context API
- **API Integration:** Axios
- **Styling:** Tailwind CSS 
## Contributing

We welcome contributions! To contribute to this project:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add some feature"
   ```

4. Push your changes:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to open an issue or contact me through [GitHub](https://github.com/abiudev).
