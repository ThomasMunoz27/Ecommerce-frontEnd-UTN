// HeroCarousel.tsx
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import style from './HeroCarousel.module.css'

const HeroCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={8000}
      transitionTime={700}
      stopOnHover
      swipeable
      emulateTouch className={style.carousel}
    >
      <div className={style.carouselCard}>
        <img
          src="./img/AdidasMessi.jpg"
          alt="Slide 1"
          className={style.carouselImg}
        />
        <div className={style.carouselText}>
          <h1>Productos hechos con la Tecnología que inspira</h1>
          <p>Innovación y diseño en un solo lugar</p>
        </div>
      </div>

      <div className={style.carouselCard}>
        <img
          src="./img/samba.jpg"          alt="Slide 2"
          className={style.carouselImg}
        />
        <div className={style.carouselText}>
          <h1 >Conectá con el alto rendimiento</h1>
          <p >Descubrí nuevas experiencias con nuestros productos</p>
        </div>
      </div>

      <div className={style.carouselCard}>
        <img
          src="./img/imgCarousel2.jpg"
          alt="Slide 3"
          className={style.carouselImg}
        />
        <div className={style.carouselText}>
          <h1>Viví el confort</h1>
          <p>Prendas de la maxima calidad</p>
        </div>
      </div>
    </Carousel>
  );
};

export default HeroCarousel;
