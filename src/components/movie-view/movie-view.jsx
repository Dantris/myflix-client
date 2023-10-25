import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    const posterBaseUrl = "https://image.tmdb.org/t/p/w185"; // Adjust the image size as needed
    const posterUrl = posterBaseUrl + movie.poster_path;

    return (
        <div>
            <div>
                <img src={posterUrl} alt={`Poster for ${movie.title}`} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.overview}</span> {/* Use overview for the description */}
            </div>
            <div>
                <span>Genre: </span>
                <span>
                    {movie.genres && movie.genres.length > 0
                        ? movie.genres[0].name
                        : "N/A"}
                </span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        poster_path: PropTypes.string,
        overview: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
        })),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
