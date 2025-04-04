import "./BotonCarrito.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCart } from "../../context/OrderContext";
import Modal from "../modal/Modal";
import SubTitle from "../titles/Subtitle";

const BotonCarrito = () => {
  // Estado para el carrito
  const [isModalOpen, setIsModalOpen] = useState(false);

  // se obtienen los datos y funciones del contexto del carrito
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
  } = useCart();

  // abrir y cerrar el modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Formato para precio
  const formatPrice = (price) => {
    return `USD ${price.toFixed(2)}`;
  };

  return (
    <div>
      {/* Icono del carrito con contador de items */}
      <div className="cart-container" onClick={toggleModal}>
        <FontAwesomeIcon className="iconCart" icon={faCartShopping} />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </div>

      {/* Modal del carrito */}
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
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={item.image}
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
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
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
                      onClick={() => removeFromCart(item.id)}
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
                  <button className="clear-cart" onClick={clearCart}>
                    Vaciar carrito
                  </button>
                  <button className="checkout-button">Finalizar compra</button>
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
