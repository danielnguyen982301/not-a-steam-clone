export default function Gutter(props) {
  const recentList = props.recentList.map((game, index) => (
    <a
      key={index}
      className="recent-item"
      onClick={() => props.showGameInfo(game.appid)}
    >
      {game.name}
    </a>
  ));

  const genreList = props.genreList.map((genre, index) => (
    <a key={index} onClick={() => props.showGamesByGenre(genre.toLowerCase())}>
      {genre}
    </a>
  ));

  return (
    <div className="gutter-box">
      <div className="gift-card gutter-section">
        <a>
          <img
            src="https://store.cloudflare.steamstatic.com/public/images//gift/steamcards_promo_03.png?v=1"
            alt=""
          />
        </a>
        STEAM GIFT CARDS
        <div>Give the Gift of Game</div>
      </div>
      <div className="gutter-section recently-viewed">
        <div className="gutter-title">RECENTLY VIEWED</div>
        <div>{recentList}</div>
      </div>
      <div className="gutter-section recommended">
        <div className="gutter-title">RECOMMENDED</div>
        <div>
          <a>By Friends</a>
          <a>By Curators</a>
          <a>Tags</a>
        </div>
      </div>
      <div className="gutter-section browse-categories">
        <div className="gutter-title">BROWSE CATEGORIES</div>
        <div>
          <a>Top Sellers</a>
          <a>New Releases</a>
          <a>Upcoming</a>
          <a>Specials</a>
          <a>VR Titles</a>
          <a>Controller-Friendly</a>
          <a>Great on Deck</a>
        </div>
      </div>
      <div className="gutter-section browse-genre">
        <div className="gutter-title">BROWSE BY GENRE</div>
        <div>{genreList}</div>
      </div>
    </div>
  );
}
