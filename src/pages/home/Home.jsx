import "./Home.css";
import ImgNosotros from "../../assets/images/banner/sobre-nosotros.webp";
import Carousel from "../../components/carousel/Carousel";
import Titles from "../../components/titles/Titles";
import Card from "../../components/card/Card";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faReceipt,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAmazonPay,
  faApplePay,
  faGooglePay,
  faPaypal,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Carousel />

      <div className="main-container">
        <section className="section-sobre-nosotros">
          <Titles titulo={"Sobre Nosotros"} />

          <div className="sobre-nosotros">
            <div className="img-sobre-nosotros">
              <img
                src={ImgNosotros}
                alt="Imagen de nosotros"
                className="img-nosotros"
              />
            </div>

            <div className="informacion-sobre-nosotros">
              <p className="text-nosotros">
                En Tecnomart, somos especialistas en ofrecerte lo último en
                tecnología. Contamos con una extensa gama de productos, que
                incluye celulares, tablets, computadoras, televisores y
                accesorios de las marcas más reconocidas. Nos destacamos por
                brindar soluciones tecnológicas innovadoras a precios
                competitivos, con un compromiso inquebrantable hacia la calidad
                y la satisfacción del cliente. Nuestra tienda online está
                diseñada para que encuentres fácilmente lo que necesitas. Navega
                por nuestras categorías de productos, descubre nuestras ofertas
                especiales y aprovecha nuestro excelente servicio de envío
                rápido y seguro. En Tecnomart, estamos aquí para ayudarte a
                encontrar la tecnología perfecta para tu estilo de vida.
              </p>
            </div>
          </div>
        </section>

        <section>
          <Titles titulo={"Celulares"} />
          <Card category="celulares" />
        </section>

        <section className="section-info-util">
          <div className="info-box">
            <div className="info-box-0">
              <div className="icons-box">
                <FontAwesomeIcon icon={faTruckFast} />
              </div>
              <p>
                Envíos a todo Montevideo. Rápido y seguro.
                <NavLink to={"/"} id="btn-envios">
                  Conoce mas
                </NavLink>
              </p>
            </div>

            <div className="info-box-1">
              <div className="icons-box">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
              <p>
                ¿Necesitas ayuda? Nos ponemos en contacto contigo.
                <NavLink to={"/"} id="btn-envios">
                  Te contactamos!
                </NavLink>
              </p>
            </div>

            <div className="info-box-2">
              <div className="icons-box">
                <FontAwesomeIcon className="icon-i" icon={faPaypal} />
                <FontAwesomeIcon className="icon-i" icon={faGooglePay} />
                <FontAwesomeIcon className="icon-i" icon={faApplePay} />
                <FontAwesomeIcon className="icon-i" icon={faAmazonPay} />
              </div>
              <p>
                Conoce los métodos de pago.
                <NavLink to={"/"} id="btn-envios">
                  Conocer mas
                </NavLink>
              </p>
            </div>

            <div className="info-box-3">
              <div className="icons-box">
                <FontAwesomeIcon icon={faReceipt} />
              </div>
              <p className="info-text">
                ¡ Mira nuestras ofertas !
                <NavLink to={"/"} href="#" id="btn-envios">
                  Ver ofertas
                </NavLink>
              </p>
            </div>
          </div>
        </section>

        <section>
          <Titles titulo={"Tablets"} />
          <Card category="tablets" />
        </section>
      </div>
    </>
  );
};

export default Home;
