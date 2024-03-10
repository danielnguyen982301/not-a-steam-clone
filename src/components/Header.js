export default function Header(props) {
  return (
    <header className="header homepage-content">
      <div className="header-content">
        <div className="steam-logo">
          <img
            src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
            alt="steam-logo"
            onClick={props.backToHome}
          />
        </div>
        <div className="header-nav">
          <a>STORE</a>
          <a>COMMUNITY</a>
          <a>ABOUT</a>
          <a>SUPPORT</a>
        </div>
        <div className="header-action">
          <a className="install-action">Install Steam</a>
          <a>login</a>
          <span> | </span>
          <span className="lang">language</span>
        </div>
      </div>
    </header>
  );
}
