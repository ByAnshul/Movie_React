import React, { useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from "./components/MovieCard"

import { useState } from 'react';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Make sure your env file uses VITE_

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint);  // No headers needed for v3
      
      if (!response.ok) {
        throw new Error("Error Fetching Movies");
      }
      const data = await response.json();
      if (data.response === 'False') {
        setErrorMsg(data.Error || "Something went wrong");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);


    } catch (error) {
      console.log("Error Fetching movies:", error);
      setErrorMsg("Error Fetching Movies");

    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src='/hero-img.png' alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies </span>You'll Enjoy Without the Hassale</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='text-white'>{searchTerm}</h1>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {loading ? (
            <Spinner/>
          ) : errorMsg ? (
              <p className='text-red-500'>{ errorMsg}</p>
            ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
          )}

        </section>

      </div>
    </main>
  );
}

export default App;
