import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

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
                // const moviesFromApi = data.map((doc) => {
                //     return {
                //         id: doc._id,
                //         image: doc.image,
                //         title: doc.title,
                //         description: doc.description,
                //         director: doc.director,
                //         genre: doc.genre,
                //         year: doc.year
                //     };
                // });

                setMovies(data);
            })
            .catch((err) => {
                console.error(err);
            });
        console.log(movies)
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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movie/:movieId"
                        element={
                            <Col md={8}>
                                {user && movies && <MovieView movies={movies} />}
                            </Col>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row >
        </BrowserRouter>
    )
};
