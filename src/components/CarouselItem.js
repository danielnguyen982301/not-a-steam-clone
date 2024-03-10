export default function CarouselItem(props) {
  const platforms = props.platforms.map((platform, index) => (
    <div key={index} className="platform">
      {" "}
      {platform}
    </div>
  ));

  return (
    <div
      className="carousel-item"
      style={{ display: props.display }}
      onClick={() => props.showGameInfo(props.appId)}
    >
      <div className="carousel-item-img">
        <img src={props.src} alt={props.name} />
      </div>
      <div className="carousel-item-info">
        <div className="carousel-item-name">{props.name}</div>
        <div className="carousel-price-and-platform">
          <div>{props.price ? `$${props.price}` : "Free"}</div>
          <div className="carousel-platform-list">{platforms}</div>
        </div>
      </div>
    </div>
  );
}
