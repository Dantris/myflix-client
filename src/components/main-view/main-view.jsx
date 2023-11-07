import React, { useEffect, useState } from "react";
import Axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import { SignupView } from "../signup-view/signup-view";


import Row from "react-bootstrap/Row";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch("https://myflix-45677d7e298f.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc._id,
                        image: doc.image,
                        title: doc.title,
                        description: doc.description,
                        director: doc.director,
                        genre: doc.genre,
                        year: doc.year
                    };
                });

                setMovies(moviesFromApi);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token]);


    // if (!user) {
    //     return (
    //         <> <LoginView onLoggedIn={(user, token) => {
    //             setUser(user);
    //             setToken(token);
    //         }} />
    //             or
    //             < SignupView />
    //         </>
    //     );
    // }

    // if (selectedMovie) {
    //     return (
    //         <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    //     );
    // }

    // if (movies.length === 0) {
    //     return <div>The list is empty!</div>;
    // }

    return (
        <Row>
            {!user ? (
                <>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                    or
                    <SignupView />
                </>
            ) : selectedMovie ? (
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)} />
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ))}
                </>
            )}
        </Row>
    )
};
