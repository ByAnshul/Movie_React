# 🎬 React Movie Finder App (with Vite + Appwrite + TMDB)

A fast and modern movie discovery application built using **React**, **Vite**, **TMDB API**, and **Appwrite**. Users can search movies, view trending content, and enjoy a sleek interface with real-time search tracking and popularity metrics.

---

## 🚀 Features

- 🔍 **Search for Movies** using TMDB API
- 📈 **Track Searches** using Appwrite's database
- 🔥 **Trending Section** shows most-searched movies
- 💡 **Debounced Input** for performance (custom hook)
- 🎨 Clean and responsive UI
- ⚙️ Built with **Vite** for lightning-fast development
- 🌐 Environment-safe API keys using `.env`

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ByAnshul/Movie_React.git
   cd Movie_React
Install dependencies

bash

npm install
Install optional packages

bash

npm i react-use
Set up environment variables

Create a .env file in the root and add:

env

VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
Run the app

bash

npm run dev
🧰 Tech Stack
React – UI library

Vite – Frontend build tool

TMDB API – Movie data provider

Appwrite – Backend service to store search analytics

Tailwind CSS – Utility-first CSS framework

Custom Hooks – For debounce input handling
