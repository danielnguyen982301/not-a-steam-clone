import SuggestedGame from "./SuggestedGame";

export default function SearchField(props) {
  const suggestedList = props.suggestedList.map((game) => (
    <SuggestedGame
      appId={game.appid}
      key={game.appid}
      name={game.name}
      src={game.header_image}
      price={game.price}
      showGameInfo={props.showGameInfo}
    />
  ));

  return (
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div className="search-field">
        <input
          type="text"
          value={props.input}
          onChange={props.handleInput}
          placeholder="Search"
          onFocus={props.clickInputBar}
          onClick={(e) => e.stopPropagation()}
        />
        <button type="submit">
          {" "}
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/000/439/746/small/Basic_Ui__28101_29.jpg"
            alt=""
          />
        </button>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="suggested-list"
        style={{ display: props.isDisplayed ? "block" : "none" }}
      >
        {suggestedList}{" "}
      </div>
    </form>
  );
}
