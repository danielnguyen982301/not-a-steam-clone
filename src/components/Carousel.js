import { useEffect, useRef, useState } from "react";
import CarouselItem from "./CarouselItem";

export default function Carousel(props) {
  const [featuredData, setFeaturedData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const timerRef = useRef(null);
  const bullets = [...Array(featuredData.length)].map((game, index) => {
    return (
      <span
        key={index}
        className={`bullet ${index === slideIndex ? "active" : ""}`}
        onClick={() => setSlideIndex(index)}
      ></span>
    );
  });

  useEffect(() => {
    props.getFeaturedGames().then((list) => {
      setFeaturedData([...list]);
    });
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSlideIndex((prevIndex) =>
        prevIndex === featuredData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearTimeout(timerRef.current);
  }, [slideIndex]);

  const featuredGames = featuredData.map((game, index) => (
    <CarouselItem
      key={game.appid}
      appId={game.appid}
      display={index === slideIndex ? "flex" : "none"}
      name={game.name}
      price={game.price}
      platforms={game.platforms}
      src={game.header_image}
      showGameInfo={props.showGameInfo}
    />
  ));

  function handlePrev() {
    const newIndex = slideIndex - 1;
    setSlideIndex(newIndex < 0 ? featuredGames.length - 1 : newIndex);
  }

  function handleNext() {
    const newIndex = slideIndex + 1;
    setSlideIndex(newIndex > featuredGames.length - 1 ? 0 : newIndex);
  }

  return (
    <div className="carousel-container">
      <div className="carousel">
        {featuredGames}
        <div className="left-arrow" onClick={handlePrev}>
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-angle-left-b-1966289-1659461.png" />
        </div>
        <div className="right-arrow" onClick={handleNext}>
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-angle-left-b-1966289-1659461.png" />
        </div>
      </div>
      <div className="bullet-container">{bullets}</div>
    </div>
  );
}
