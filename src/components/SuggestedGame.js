export default function SuggestedGame(props) {
  return (
    <div
      onClick={() => props.showGameInfo(props.appId)}
      className="item-container"
    >
      <div className="item-img">
        <img src={props.src} alt={props.name} />
      </div>
      <div className="item-basic-info">
        <div className="item-name basic-info">{props.name}</div>
        <div className="item-price basic-info">
          {props.price ? `$${props.price}` : "FREE"}
        </div>
      </div>
    </div>
  );
}
