import React, { useEffect, useState } from "react";
import "./Info.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/movieSlice";

const Info = () => {
    const id = useSelector((state) => state.movie.id);
    const movie = useSelector((state) => state.movie.data);
    const status = useSelector((state) => state.movie.status);

    const dispatch = useDispatch();

    // Fetch movies from TMDb API
    useEffect(() => {
        if (id) {
            dispatch(fetchData(id));
        }
    }, [id, dispatch]);

    console.log(movie);
    return (
        <div>
            {status === "loading" && <p>Loading...</p>}
            {status === "succeeded" && (
                <div className="info-container" style={{}}>
                    <h2>{movie.original_title}</h2>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                </div>
            )}
            {status === "failed" && <p>Failed to load data</p>}
        </div>
    );
};

export default Info;
