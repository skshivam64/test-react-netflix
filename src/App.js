// src/App.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, addUser } from "./redux/movieSlice";

function App() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.data);
    const status = useSelector((state) => state.user.status);

    const [newUser, setNewUser] = useState({ name: "", email: "" });
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchData());
        }
    }, [status, dispatch]);

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(newUser));
        setCounter(counter + 1);
        setNewUser({ name: "", email: "" });
    };

    return (
        <div>
            <h1>Redux API Example</h1>
            {status === "loading" && <p>Loading...</p>}
            {status === "succeeded" && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                        </li>
                    ))}
                </ul>
            )}
            {status === "failed" && <p>Failed to load data</p>}

            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                />
                <button type="submit">Add User</button>
            </form>
            <h1>{counter} users added by you</h1>
        </div>
    );
}

export default App;
