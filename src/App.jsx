import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from './appwrite';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchMovies = async (query) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const endpoint = query.trim()
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results) {
        setMovieList(data.results);
        setErrorMsg('');

        // Only update search count if it's a search, not discover
        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      }
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        setErrorMessage('Error fetching movies. Please try again later.');
      } finally {
        setLoading(false);
      }
  };

  const loadTrendingMovie = async (query = '') => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      
    }
    catch (error) {
      console.error(`Error Fetching Trending Movies ${error}`)
    }
  }

  // Fetch movies when component mounts and when debounced search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovie();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero-img.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.Poster_url} alt={movie.title} />

                </li>
              ))}
            </ul>

          </section>
        )}
        <section className="all-movies">
          <h2 >All Movies</h2>
          {loading ? (
            <Spinner />
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
