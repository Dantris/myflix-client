import React from 'react'
import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {

    console.log(encodeURIComponent(movie._id))
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
                    <Button variant='link'>
                        See more
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

// Define PropTypes for the MovieCard component
MovieCard.propTypes = {
    movie: PropTypes.shape({
        // id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        // genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
        // release_date: PropTypes.string.isRequired,
    }).isRequired,
};
