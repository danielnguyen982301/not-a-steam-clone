import { useState } from "react";
import Carousel from "./components/Carousel";
import GameInfo from "./components/GameInfo";
import Gutter from "./components/Gutter";
import Header from "./components/Header";
import BodyNav from "./components/BodyNav";
import SuggestedGame from "./components/SuggestedGame";
import "./styles.css";

export default function App(props) {
  const [pageContent, setPageContent] = useState([
    <Carousel
      getFeaturedGames={props.getFeaturedGames}
      showGameInfo={showGameInfo}
    />,
  ]);
  const [bodyContentTitle, setBodyContentTitle] = useState(
    "FEATURED & RECOMMENDED"
  );
  const [recentList, setRecentList] = useState([]);
  const [visitedList, setVisitedList] = useState([]);
  const [input, setInput] = useState("");
  const [suggestedList, setSuggestedList] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  function backToHome() {
    setBodyContentTitle("FEATURED & RECOMMENDED");
    setPageContent(
      <Carousel
        getFeaturedGames={props.getFeaturedGames}
        showGameInfo={showGameInfo}
      />
    );
  }

  function handleInput(e) {
    if (e.target.value) {
      setIsDisplayed(true);
    } else {
      setIsDisplayed(false);
    }
    setInput(e.target.value);
    const getAllGames = async () => {
      try {
        const response = await fetch(
          `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?q=${e.target.value}`
        );
        const data = await response.json();
        const featuredList = data.data;
        return featuredList;
      } catch (err) {
        console.log(err);
      }
    };
    if (e.target.value) {
      getAllGames().then((list) => {
        setSuggestedList([...list]);
      });
    } else {
      setSuggestedList([]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setBodyContentTitle(`Search results by "${input}" :`);
    const getAllGames = async () => {
      try {
        const response = await fetch(
          `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?q=${input}&limit=20`
        );
        const data = await response.json();
        const featuredList = data.data;
        return featuredList;
      } catch (err) {
        console.log(err);
      }
    };

    getAllGames().then((list) => {
      const gameList = list.map((game) => (
        <SuggestedGame
          appId={game.appid}
          key={game.appid}
          name={game.name}
          src={game.header_image}
          price={game.price}
          showGameInfo={showGameInfo}
        />
      ));
      setPageContent([...gameList]);
    });
  }

  function clickInputBar() {
    setIsDisplayed(true);
  }

  function showGamesByGenre(genre) {
    let param = genre;
    if (param.includes("&")) {
      param = param.replace("&", "%26");
    }
    setIsDropdownShown(false);
    setBodyContentTitle(`GENRE: ${genre.toUpperCase()}`);
    const getGameInfo = async () => {
      try {
        const response = await fetch(
          `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=${param.toLowerCase()}&limit=20`
        );
        const gameInfo = await response.json();
        return gameInfo.data;
      } catch (err) {
        console.log(err);
      }
    };

    getGameInfo().then((gameList) => {
      const gameListByGenre = gameList.map((game) => (
        <SuggestedGame
          key={game.appid}
          name={game.name}
          src={game.header_image}
          price={game.price}
          appId={game.appid}
          showGameInfo={showGameInfo}
        />
      ));
      setPageContent(gameListByGenre);
    });
  }

  function showGamesByTags(tag) {
    setBodyContentTitle(`TAG: ${tag.toUpperCase()}`);
    const getGameInfo = async () => {
      try {
        const response = await fetch(
          `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?steamspy_tags=${tag.toLowerCase()}&limit=20`
        );
        const gameInfo = await response.json();
        return gameInfo.data;
      } catch (err) {
        console.log(err);
      }
    };

    getGameInfo().then((gameList) => {
      const gameListByTag = gameList.map((game) => (
        <SuggestedGame
          key={game.appid}
          name={game.name}
          src={game.header_image}
          price={game.price}
          showGameInfo={showGameInfo}
          appId={game.appid}
        />
      ));
      setPageContent(gameListByTag);
    });
  }

  function showGameInfo(gameId) {
    setIsDisplayed(false);
    const getGameInfo = async () => {
      try {
        const response = await fetch(
          `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${gameId}`
        );
        const gameInfo = await response.json();
        return gameInfo.data;
      } catch (err) {
        console.log(err);
      }
    };

    getGameInfo().then((game) => {
      if (!visitedList.includes(game.appid)) {
        setVisitedList((prevList) => [...prevList, game.appid]);
        setRecentList((prevList) => [...prevList, game]);
      }
      setBodyContentTitle(game.name.toUpperCase());
      setPageContent(
        <GameInfo
          showGamesByTags={showGamesByTags}
          showGamesByGenre={showGamesByGenre}
          name={game.name}
          posReviews={game.positive_ratings}
          negReviews={game.negative_ratings}
          dev={game.developer}
          publisher={game.developer}
          releaseDate={game.release_date}
          genres={game.genres}
          src={game.header_image}
          description={game.description}
          tags={game.steamspy_tags}
        />
      );
    });
  }

  return (
    <div
      className="App"
      onClick={() => {
        setIsDisplayed(false);
        setIsDropdownShown(false);
      }}
    >
      <Header backToHome={backToHome} />
      <BodyNav
        showDropdown={(e) => {
          e.stopPropagation();
          setIsDropdownShown(true);
        }}
        hideDropdown={() => setIsDropdownShown(false)}
        isDropdownShown={isDropdownShown}
        getGenresList={props.getGenresList}
        suggestedList={suggestedList}
        input={input}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isDisplayed={isDisplayed}
        clickInputBar={clickInputBar}
        showGameInfo={showGameInfo}
        showGamesByGenre={showGamesByGenre}
      />
      <div className="homepage-content body-container">
        <Gutter
          recentList={recentList}
          genreList={props.genreList}
          showGameInfo={showGameInfo}
          showGamesByGenre={showGamesByGenre}
        />
        <div className="body-content-container">
          <div onClick={backToHome} className="return-home-button">
            {"<"} Back to Home{" "}
          </div>
          <div className="body-content-title">{bodyContentTitle}</div>
          <div className="body-content">{pageContent}</div>
        </div>
      </div>
    </div>
  );
}
