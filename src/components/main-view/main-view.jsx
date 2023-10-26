import React, { useEffect, useState } from "react";
import Axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const tmdbApiKey = "7b1ffea1c8f3081323fb2250e590d048";

    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [tmdbApiKey]);

    useEffect(() => {
        if (!token) return;

        fetch("https://myflix-45677d7e298f.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);

            });
    }, [token]);


    if (!user) {
        return (
            <> <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
                or
                < SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    )
};
