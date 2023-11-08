import React from "react";
import PropTypes from "prop-types";

import '../movie-view/movie-view.scss'

export const MovieView = ({ movie, onBackClick }) => {

    return (
        <div>
            <div>
                <img src={movie.image} alt={`Poster for ${movie.title}`} className='movie-poster' />
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
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{movie.year}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>
                    {movie.genre}
                </span>
            </div>
            <button
                onClick={onBackClick}
                className="back-button"
                style={{ cursor: "pointer" }}
            >
                Back
            </button>

        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        director: PropTypes.string,
        year: PropTypes.number,
        genre: PropTypes.string,
        // poster_path: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
