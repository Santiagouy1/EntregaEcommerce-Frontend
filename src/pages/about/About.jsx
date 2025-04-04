import "./About.css";
import yoImg from "../../assets/images/yo-img.webp";
import { useEffect } from "react";

const About = ({ title }) => {

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <main id="main-nosotros">
      <section className="section-sobre-nosotros">
        <div className="titles">
          <h2 className="title-nosotros">Sobre Nosotros</h2>
        </div>

        <div className="sobre-nosotros">
          <div className="informacion-sobre-nosotros">
            <p className="text-nosotros">
              En Tecnomart, somos especialistas en ofrecerte lo último en
              tecnología. Contamos con una extensa gama de productos, que
              incluye celulares, tablets, computadoras, televisores y accesorios
              de las marcas más reconocidas. Nos destacamos por brindar
              soluciones tecnológicas innovadoras a precios competitivos, con un
              compromiso inquebrantable hacia la calidad y la satisfacción del
              cliente. Nuestra tienda online está diseñada para que encuentres
              fácilmente lo que necesitas. Navega por nuestras categorías de
              productos, descubre nuestras ofertas especiales y aprovecha
              nuestro excelente servicio de envío rápido y seguro. En Tecnomart,
              estamos aquí para ayudarte a encontrar la tecnología perfecta para
              tu estilo de vida.
            </p>
          </div>
        </div>
      </section>

      <section className="section-nuestra-mision">
        <div className="titles">
          <h2 className="title-nuestra-mision">Nuestra Misión</h2>
        </div>
        <div className="informacion-nuestra-mision">
          <p className="text-mision">
            Misión: En Tecnomart, nuestra misión es facilitar el acceso a la
            tecnología de vanguardia, brindando a nuestros clientes una amplia
            gama de productos innovadores como celulares, tablets, computadoras
            y televisores. Nos comprometemos a ofrecer soluciones tecnológicas
            de alta calidad que mejoren la vida de las personas, proporcionando
            un servicio confiable y personalizado. Creemos en la importancia de
            mantenernos a la vanguardia de las tendencias tecnológicas para
            satisfacer las necesidades de nuestros usuarios en un mundo digital
            en constante evolución.
          </p>
        </div>
      </section>

      <section className="section-info-personal">
        <div className="titles">
          <h2 className="title-info-personal">Integrantes</h2>
        </div>

        <div className="info-personal">
          <div className="img-container-personal">
            <img
              loading="lazy"
              src={yoImg}
              alt="Imagen Santiago Dono"
              className="img-personal"
            />
          </div>

          <div className="text-personal">
            <h2 className="title-personal">Santiago Doño</h2>
            <p className="txt-info-personal">
              Estudiante de Ingenieria en Sistemas proximamente, Programador
              Full-Stack en progreso.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
