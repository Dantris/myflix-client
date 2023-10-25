import { useEffect, useState } from "react";
import Axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";

export const MainView = () => {
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
        </div>
    );
};

MainView.propTypes = {
    // Define PropTypes for your components as needed
};
