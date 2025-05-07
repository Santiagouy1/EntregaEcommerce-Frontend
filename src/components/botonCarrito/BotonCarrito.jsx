import "./BotonCarrito.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useCart } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import SubTitle from "../titles/Subtitle";
import Swal from "sweetalert2";

const BotonCarrito = () => {
  // Estado para el carrito
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const MySwal = Swal.mixin({
    customClass: {
      container: 'my-swal-z-index'
    }
  });

  // se obtienen los datos y funciones del contexto del carrito
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    createOrder,
    updateCartPrices
  } = useCart();

  // Obtener estado de autenticación
  const { isAuthenticated } = useUser();

  // abrir y cerrar el modal
  const toggleModal = () => {
    if (!isModalOpen) {
      updateCartPrices(); // Actualizar precios 
    }
    setIsModalOpen(!isModalOpen);
  };

  // Actualizar los precios cuando el componente se monta
  useEffect(() => {
    updateCartPrices();
  }, []);

  // Formato para precio
  const formatPrice = (price) => {
    return `USD ${price.toFixed(2)}`;
  };

  // Función para procesar la compra
  const handleCheckout = async () => {

    // Actualizar precios 
    await updateCartPrices();
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      Swal.fire({
        icon: "info",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para realizar una compra",
        showCancelButton: true,
        confirmButtonText: "Ir a iniciar sesión",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          toggleModal(); 
          navigate("/login");
        }
      });
      return;
    }

    Swal.fire({
      title: "Confirmar compra",
      text: `¿Deseas finalizar tu compra por ${formatPrice(totalPrice)}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, comprar ahora",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Procesando tu compra",
          text: "Espera un momento...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Crear la orden
        const result = await createOrder();

        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "¡Compra realizada!",
            text: "Tu orden ha sido procesada correctamente",
            timer: 2000,
            showConfirmButton: false
          });
          toggleModal(); 
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Hubo un error al procesar tu compra"
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="cart-container" onClick={toggleModal}>
        <FontAwesomeIcon className="iconCart" icon={faCartShopping} />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="cart-modal">
          <SubTitle title={"Mi carrito"} />

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={`${import.meta.env.VITE_FILES_URL}/products/${item.image}`}
                        alt={item.product}
                        className="cart-item-image"
                      />
                    </div>
                    <div className="item-details">
                      <h3>{item.product}</h3>
                      <p className="item-price">{formatPrice(item.price)}</p>

                      <div className="item-quantity">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>

                      <p className="item-subtotal">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    
                    <button
                      className="btn btnEliminarCart"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="cart-actions">
                  <button className="clear-cart" onClick={() => {
                    MySwal.fire({
                      title: "¿Vaciar carrito?",
                      text: "Se eliminarán todos los productos del carrito",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Sí, vaciar carrito",
                      cancelButtonText: "Cancelar"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        clearCart();
                        Swal.fire({
                          title: "Carrito vacío",
                          text: "Se han eliminado todos los productos del carrito",
                          icon: "success",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      }
                    });
                  }}>
                    Vaciar carrito
                  </button>
                  <button className="checkout-button" onClick={handleCheckout}>
                    Finalizar compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BotonCarrito;
