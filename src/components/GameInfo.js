export default function GameInfo(props) {
  const genres = props.genres.map((genre, index) => (
    <a
      key={index}
      className="single-game-genre"
      onClick={() => props.showGamesByGenre(genre)}
    >
      {genre}
    </a>
  ));

  const tags = props.tags.map((tag, index) => (
    <a
      key={index}
      className="game-tag"
      onClick={() => props.showGamesByTags(tag)}
    >
      {tag}
    </a>
  ));

  return (
    <div className="outer-game-info-container">
      <div className="single-game-genre-list">Genres: {genres}</div>
      <div className="game-info-container">
        <div className="game-img">
          <img src={props.src} alt={props.name} />
        </div>

        <div className="main-game-info">
          <div className="game-description">{props.description}</div>
          <div className="game-info">
            POSITIVE RATINGS: {props.posReviews} reviews
          </div>
          <div className="game-info">
            NEGATIVE RATINGS: {props.negReviews} reviews
          </div>
          <div className="game-info">
            RELEASE DATE: {props.releaseDate.substring(0, 10)}
          </div>
          <div className="game-info">DEVELOPER: {props.dev}</div>
          <div className="game-info">PUBLISHER: {props.publisher}</div>
        </div>
      </div>
      <div className="game-tag-list-container">
        <div className="tag-header">
          {" "}
          Popular user-defined tags for this product:{" "}
        </div>
        <div className="game-tag-list">{tags}</div>
      </div>
    </div>
  );
}
