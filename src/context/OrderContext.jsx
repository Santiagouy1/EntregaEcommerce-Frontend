import { createContext, useState, useContext, useEffect } from 'react';

// contexto del carrito
const CartContext = createContext();

// Hook para acceder al contexto
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // recuperar el carrito del localStorage al iniciar
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al cargar el carrito del localStorage:", error);
      return [];
    }
  });

  // se guarda el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Funcion para agregar un producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Vemops si el producto ya esta en el carrito
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Si ya existe, creamos un nuevo array con el item actualizado
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Si no existe, agregamos el nuevo producto
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    return Promise.resolve({ success: true });
  };

  // remover un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Funcion para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Total de items en el carrito
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Precio total del carrito
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;