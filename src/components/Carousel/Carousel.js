import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Carousel.css";
import { addMovie } from "../../redux/movieSlice";
import { useDispatch } from "react-redux";

const Carousel = () => {
    const [movies, setMovies] = useState([]);

    const dispatch = useDispatch();

    // Fetch movies from TMDb API
    useEffect(() => {
        const fetchMovies = async () => {
            const API_KEY = "30560503a2bf2603ab571c72b800a94d";
            const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

            try {
                const response = await axios.get(URL);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching data from TMDb:", error);
            }
        };

        fetchMovies();
    }, []);

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

        await dispatch(addMovie(card.id));
    };

    return (
        <div>
            <h2>Movies</h2>
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
        </div>
    );
};

export default Carousel;
