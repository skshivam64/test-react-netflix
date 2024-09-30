import React, { useEffect } from "react";
import "./Carousel.css";
import { selectMovie } from "../../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movieSlice";

const Carousel = () => {
    const movies = useSelector((state) => state.movie.movies);
    const status = useSelector((state) => state.movie.statusMovies);

    const dispatch = useDispatch();

    // Fetch movies from TMDb API
    useEffect(() => {
        dispatch(fetchMovies());
    }, [movies, dispatch]);

    const zoominCard = (e) => {
        let card = e.target;

        if (!card) return;
        if (
            card.id &&
            (card.id.startsWith("img") || card.id.startsWith("title"))
        )
            card = card.parentElement;

        card.classList.add("zoomed");
    };

    const zoomoutCard = (e) => {
        let card = e.target;

        if (!card) return;
        if (
            card.id &&
            (card.id.startsWith("img") || card.id.startsWith("title"))
        )
            card = card.parentElement;

        card.classList.remove("zoomed");
    };

    const clickHandler = async (e) => {
        let card = e.target;

        if (!card) return;
        if (
            card.id &&
            (card.id.startsWith("img") || card.id.startsWith("title"))
        )
            card = card.parentElement;

        await dispatch(selectMovie(card.id));
    };

    return (
        <div>
            <h2>Movies</h2>
            {status !== "idle" && (
                <div className="carousel">
                    {movies.map((movie, index) => (
                        <div
                            id={movie.id}
                            key={index}
                            className="card"
                            onMouseEnter={zoominCard}
                            onMouseLeave={zoomoutCard}
                            onClick={clickHandler}
                        >
                            <img
                                id={`img-${index}`}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3 id={`title-${index}`}>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
