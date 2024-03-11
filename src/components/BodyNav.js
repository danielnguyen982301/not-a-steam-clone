import { useState, useEffect } from "react";
import SearchField from "./SearchField";

export default function BodyNav(props) {
  const [genresList, setGenresList] = useState([]);
  useEffect(() => {
    props.getGenresList().then((list) => {
      setGenresList([...list]);
    });
  }, []);

  const dropdownGenres = genresList.map((genre) => (
    <div
      onClick={() => props.showGamesByGenre(genre.name)}
      className="dropdown-genre"
    >
      {genre.name.toUpperCase()}
    </div>
  ));
  return (
    <div className="homepage-content body-nav">
      <div className="nav-area">
        <div className="dropdown">
          <div className="dropdown-headers">
            <a>Your Store</a>
            <a>New & Noteworthy</a>
            <a
              className="categories"
              onClick={props.showDropdown}
              style={{ cursor: "pointer" }}
              onMouseLeave={props.hideDropdown}
              onMouseOver={props.showDropdown}
            >
              Categories
            </a>
            <a>Points Shop</a>
            <a>News</a>
            <a>Labs</a>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseOver={props.showDropdown}
            onMouseLeave={props.hideDropdown}
            style={{ display: props.isDropdownShown ? "block" : "none" }}
            className="categories-dropdown"
          >
            <div className="genres-text">Genres</div>
            <div className="dropdown-genres">{dropdownGenres}</div>
          </div>
        </div>
        <SearchField
          suggestedList={props.suggestedList}
          input={props.input}
          handleInput={props.handleInput}
          handleSubmit={props.handleSubmit}
          isDisplayed={props.isDisplayed}
          clickInputBar={props.clickInputBar}
          showGameInfo={props.showGameInfo}
        />
      </div>
    </div>
  );
}
