import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/OrderContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Contexto del carrito
  const { addToCart } = useCart();
  
  const URL_PRODUCTS = "https://67cb832e3395520e6af589a3.mockapi.io/products";
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL_PRODUCTS}/${id}`);
        if (!response.ok) throw new Error("Error al cargar el producto");
        
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    if (product && product.product) {
      document.title = `TecnoMart | ${product.product}`;
    } else {
      document.title = 'TecnoMart | Cargando producto...';
    }
  }, [product]);
  
  const handleAgregarAlCarrito = async () => {
    if (!product) return;
    
    try {
      await addToCart(product);
      
      // Muestra mensaje de éxito
      setSuccessMessage(`${product.product} fue agregado al carrito`);
      
      // Se oculta el mensaje
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };
  
  if (loading) return <div className="loading-container">Cargando detalles del producto...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;
  if (!product) return <div className="error-container">Producto no encontrado</div>;
  
  return (
    <>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      <main id="main-product-container">
        {/* Sección móvil */}
        <section className="section-title-img-mobile">
          <div className="img-product-container">
            <img 
              loading="lazy" 
              src={product.image} 
              alt={`Imagen de ${product.product}`}
              className="img-product"
            />
          </div>

          <div className="title-text-product">
            <h2 className="title-text">{product.product}</h2>
          </div>

          <div className="price-input">
            <div className="text-price">
              <p className="price">USD {product.price}</p>
            </div>
            
          </div>

          <div className="btn-add-detail">
              <button 
                className="card-adding" 
                type="button"
                onClick={handleAgregarAlCarrito}
              >
                Comprar
              </button>
            </div>
        </section>

        {/* Sección desktop */}
        <section className="section-title-img-desktop">
          <div className="img-product-container">
            <img 
              loading="lazy" 
              src={product.image} 
              alt={`Imagen de ${product.product}`}
              className="img-product"
            />
          </div>

          <div className="container-title-price-btn">
            <div className="title-text-product">
              <h2 className="title-text">{product.product}</h2>
            </div>

            <div className="price-input">
              <div className="text-price">
                <p className="price">USD {product.price}</p>
              </div>

            </div>

            <div className="btn-add-detail">
              <button 
                className="card-adding" 
                type="button"
                onClick={handleAgregarAlCarrito}
              >
                Comprar
              </button>
            </div>
          </div>
        </section>

        <section className="section-description">
          <div className="title-description-prodcut">
            <h3 className="title-description">Descripción</h3>
            <h4 className="description-info">{product.category} | {product.product}</h4>
          </div>
          
          <div className="text-description-product">
            <p className="text-description">
              {product.description}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetail;