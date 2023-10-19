import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Seven",
            image:
                "https://m.media-amazon.com/images/I/91t6rl97PpL._AC_UF400,400_QL80_.jpg",
            description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives. Two detectives, one about to leave and one entering find themselves following a series of murders, they find clues linking the deaths and the seven sins.",
            genre: "Thriller",
            director: "David Fincher",
        },
        {
            id: 2,
            title: "Jurassic Park",
            image:
                "https://m.media-amazon.com/images/I/610fuvWAaqL._AC_UF400,400_QL80_.jpg",
            description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
            genre: "Horror",
            director: "Steven Spielberg",
        },
        {
            id: 3,
            title: "Independence Day",
            image:
                "https://m.media-amazon.com/images/I/51PxbCJznPL._AC_UF400,400_QL80_.jpg",
            description: "The film focuses on disparate groups of people who converge in the Nevada desert in the aftermath of a worldwide attack by a powerful extraterrestrial race.",
            genre: "Sci-Fi",
            director: "Roland Emmerich",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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
