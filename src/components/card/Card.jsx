import './Card.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/OrderContext';
import { URL } from '../../config/env.config';

const Card = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Contexto del carrito
  const { addToCart } = useCart();
  
  const URL_PRODUCTS = `${URL}/products`;
  
  useEffect(() => {
    const fetchProductosPorCategoria = async () => {
      setLoading(true);
      try {
        const response = await fetch(URL_PRODUCTS);
        if (!response.ok) throw new Error("Error al cargar productos");
        
        const data = await response.json();
        
        // Asegurar que data sea un array
        const productsArray = Array.isArray(data) ? data : 
                             (data.products ? data.products : []);
        
        const filteredProducts = category
          ? productsArray.filter(product => product.category === category)
          : productsArray;
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setProducts([]);
        setLoading(false);
      }
    };
    
    fetchProductosPorCategoria();
  }, [category]);
  
  const handleAgregarAlCarrito = async (product) => {
    try {
      await addToCart(product, 1);
      
      // mensaje de éxito
      setSuccessMessage(`${product.product} fue agregado al carrito`);
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      return { success: true };
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      return Promise.reject(new Error("No se pudo agregar el producto"));
    }
  };
  
  // Verificar si products es un array
  const productsArray = Array.isArray(products) ? products : [];
  
  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (productsArray.length === 0) return <div>No hay productos en esta categoría</div>;
  
  return (
    <div className="section-items">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      <div className="prodcut-container">
        {productsArray.map(product => (
          <article key={product._id || `temp-${Math.random()}`} className="card-brands">
            <div className="card-content-brands">
              <img
                src={`${import.meta.env.VITE_FILES_URL}/products/${product.image}`}
                alt={`Imagen de ${product.product}`}
                loading="lazy"
                className="card-img-brands"
              />
              <div className="card-status">NEW</div>
              <div className="card-icon-container-brands">
                <div className="icon-circle-brands">
                  <Link
                    className="link-lupa"
                    to={`/pages/products/${product._id}`}
                    title='Ver mas detalle'
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Link>
                </div>
                <div className="icon-circle-brands">
                  <button 
                    className="carrito-icon-btn"
                    onClick={() => handleAgregarAlCarrito(product)}
                    title="Agregar al carrito"
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-info">
              <h3 className="card-title">{product.product}</h3>
              <p className="txt-brands">{product.description}</p>
              <div className="price">
                <div className="card-price">USD {product.price}</div>
              </div>
              
              <button 
                className="card-add"
                onClick={() => handleAgregarAlCarrito(product)}
              >
                Comprar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Card;