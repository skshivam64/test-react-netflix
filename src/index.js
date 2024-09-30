// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Carousel from "./components/Carousel/Carousel";
import Info from "./components/Info/Info";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Carousel />
            <Info />
        </React.StrictMode>
    </Provider>
);
