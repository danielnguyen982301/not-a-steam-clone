import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const getFeaturedGames = async () => {
  try {
    const response = await fetch(
      `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features`
    );
    const data = await response.json();
    const featuredList = data.data;
    return featuredList;
  } catch (err) {
    console.log(err);
  }
};

const getAllGames = async () => {
  try {
    const response = await fetch(
      `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games`
    );
    const data = await response.json();
    const allGamesList = data.data;
    return allGamesList;
  } catch (err) {
    console.log(err);
  }
};

const getGenresList = async () => {
  try {
    const response = await fetch(
      `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?limit=24`
    );
    const data = await response.json();
    const genresList = data.data;
    return genresList;
  } catch (err) {
    console.log(err);
  }
};

const genreList = [
  "Free to Play",
  "Early Access",
  "Action",
  "Adventure",
  "Casual",
  "Indie",
  "Massively Multiplayer",
  "Racing",
  "RPG",
  "Simulation",
  "Sports",
  "Strategy",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      getFeaturedGames={getFeaturedGames}
      getGenresList={getGenresList}
      genreList={genreList}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
