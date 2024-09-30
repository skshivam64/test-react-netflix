import React, { useEffect } from "react";
import "./Info.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneMovie } from "../../redux/movieSlice";

const Info = () => {
    const id = useSelector((state) => state.movie.selectedMovieId);
    const movie = useSelector((state) => state.movie.selectedMovie);
    const status = useSelector((state) => state.movie.statusSelectedMovie);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchOneMovie(id));
        }
    }, [id, dispatch]);

    console.log(movie);
    return (
        <div>
            {status !== "idle" && (
                <div className="info-container">
                    {status === "loading" && <h2>Loading...</h2>}
                    {status === "succeeded" && (
                        <div>
                            <h2>{movie.original_title}</h2>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.original_title}
                            />
                        </div>
                    )}
                    {status === "failed" && <h2>Failed to get data...</h2>}
                </div>
            )}
        </div>
    );
};

export default Info;
