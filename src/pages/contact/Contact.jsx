import "./Contact.css";
import oficiaContactoMobile from "../../assets/images/banner/oficina.webp";
import oficiaContactoGrande from "../../assets/images/banner/oficina-2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import FormContact from "./formContact/FormContact";
import { useEffect } from "react";

const Contact = ({title}) => {
  useEffect(() => {
      document.title = title;
    }, [title]);
  return (
    <>
      <section id="hero-contacto">
        <picture>
          {/* <!-- Imagen para pantallas grandes (escritorio) --> */}

          <source media="(min-width: 1023px)" srcSet={oficiaContactoGrande} />

          {/* <!-- Imagen para tablet --> */}
          <source media="(min-width: 767px)" srcSet={oficiaContactoGrande} />

          {/* <!-- Imagen para dispositivos móviles (default) --> */}
          <img
            loading="lazy"
            src={oficiaContactoMobile}
            alt="Imagen"
            className="img-hero-contacto"
          />
        </picture>
      </section>

      <section id="main-contacto">
        <section className="section-contacto">
          <div className="container-texto">
            <h2 className="title-contacto">Hola!</h2>
            <p className="text-contacto">
              Si necesitás asesoramiento en tu compra no dudes en contactar con
              nuestro equipo de atención telefónica.
            </p>
            <div className="horario">Lunes a Viernes de 10 a 20hs</div>
            <div className="contactos-formas">
              <p className="number-container">
                <FontAwesomeIcon className="iconContacto" icon={faWhatsapp} />
                +598 99 999 999
              </p>
              <p className="number-container">
                <FontAwesomeIcon className="iconContacto" icon={faPhone} /> +598
                2700 9999
              </p>
              <p className="email-contact">TecnoMart@gmail.com</p>
            </div>
          </div>

          <FormContact />
        </section>
      </section>

      <section className="section-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26177.090333470507!2d-56.1535209417343!3d-34.90302908098626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f811610232aff%3A0xccbfb691fb160492!2sMontevideo%20Shopping!5e0!3m2!1ses!2suy!4v1729802906289!5m2!1ses!2suy"
          width="600"
          height="450"
          loading="lazy"
          className="map-google"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
