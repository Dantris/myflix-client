import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap'

import "../movie-card/movie-card.scss"

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="movie-card">
            <Card.Img variant="top" src={movie.image} className="movie-image" />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
            </Card.Body>
        </Card>
    );
};

// Define PropTypes for the MovieCard component
MovieCard.propTypes = {
    movie: PropTypes.shape({
        // id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        // genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
        // release_date: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};
