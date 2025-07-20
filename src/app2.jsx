import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from "./components/MovieCard";

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
            } else {
                setMovieList([]);
                setErrorMsg('No movies found');
            }
        } catch (error) {
            setErrorMsg("Error fetching movies. Please try again.");
            setMovieList([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch movies when component mounts and when debounced search term changes
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="/hero-img.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>
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
