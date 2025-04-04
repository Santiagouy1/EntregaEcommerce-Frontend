import "./Footer.css";
import logo from  '../../assets/images/logos/Logo-tecno-mart-white-removebg.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  return (
      <footer id="main-footer">
        <div className="footer-info">
          <section className="empresa-info">
            <ul className="order-list-footer">
              <li className="title-section">Empresa</li>
              <li className="list-footer-empresa">
                <Link to={"/about"}>Nosotros</Link>
              </li>
              <li className="list-footer-empresa">
                <Link to={"/"}>Politicas de privacidad</Link>
              </li>
              <li className="list-footer-empresa">
                <Link to={"/"}>Terminos y condiciones</Link>
              </li>
            </ul>
          </section>
          <section className="cuentas-info">
            <ul className="order-list-footer">
              <li className="title-section">Redes</li>
              <li className="list-footer-redes">
                <Link href="#" target="_blank" title="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </li>
              <li className="list-footer-redes">
                <Link href="#" target="_blank" title="Facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                </Link>
              </li>
              <li className="list-footer-redes">
                <Link href="#" target="_blank" title="TikTok">
                  <FontAwesomeIcon icon={faTiktok}/>
                </Link>
              </li>
              <li className="list-footer-redes">
                <Link href="#" target="_blank" title="X">
                  <FontAwesomeIcon icon={faTwitter}/>
                </Link>
              </li>
            </ul>
          </section>
          <section className="logo-footer">
            <div className="img-footer">
              <img
                src={logo}
                alt="Logo TecnoMart"
                className="logo-img-footer"
                title="Logo de Tecno Mart"
              />
            </div>
            <div className="name">
              <h2 className="name-logo">
                Tecno <br />
                <b>M</b>art
              </h2>
            </div>
          </section>
        </div>
        <div className="footer-bottom">
          <p>&copy; TecnoMart. Todos los derechos reservados.</p>
        </div>
      </footer>
  );
};

export default Footer;
