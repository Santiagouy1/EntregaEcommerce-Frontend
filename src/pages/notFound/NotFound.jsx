import { Link } from 'react-router-dom';
import './NotFound.css'; 

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className='title-not-found'>404</h1>
      <h2 className='subtitle-not-found'>¡Oops! La página que estás buscando no se encuentra.</h2>
      <p className='text-not-found'>Puede que la dirección URL esté incorrecta o que la página haya sido eliminada.</p>
      <Link className='link-notFound' to="/">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;