import "./Carousel.css";
import { useState, useEffect, useRef } from "react";
import Img1Mobile from "../../assets/images/banner/Iphone-16.webp";
import Img1Desktop from "../../assets/images/banner/iphone16-1920x600.webp";
import Img2Mobile from "../../assets/images/banner/Banner-samsung-galaxy-s24-ultra.webp";
import Img2Desktop from "../../assets/images/banner/banner-samsung-s24-1920x600.webp";
import Img3Mobile from "../../assets/images/banner/banner-xiaomi.webp";
import Img3Desktop from "../../assets/images/banner/banner-xiaomi-1920x600.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const images = [
    { mobile: Img1Mobile, desktop: Img1Desktop, alt: "iPhone 16" },
    {
      mobile: Img2Mobile,
      desktop: Img2Desktop,
      alt: "Samsung galaxy s24 ultra",
    },
    {
      mobile: Img3Mobile,
      desktop: Img3Desktop,
      alt: "Tablet xiaomi redmi pad se",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselWrapperRef = useRef(null);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="section-hero-carousel">
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={goToPrev}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </button>
        <div className="carousel-wrapper" ref={carouselWrapperRef}>
          <div
            className="carousel-slide"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <picture>
                  <source srcSet={image.desktop} media="(min-width: 768px)" />
                  <img
                    className="img-carousel"
                    src={image.mobile}
                    alt={image.alt}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button next" onClick={goToNext}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </div>
      <div className="carousel-indicadores">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicador ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
