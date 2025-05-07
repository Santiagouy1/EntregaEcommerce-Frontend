import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../config/env.config';
import { useUser } from './UserContext';

// contexto del carrito
const CartContext = createContext();

// Hook para acceder al contexto
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user, token, isAuthenticated } = useUser();
  
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

  // Limpiar carrito cuando se cierra sesión 
  useEffect(() => {
    if (!isAuthenticated) {
      clearCart();
    }
  }, [isAuthenticated]);

  // Función para actualizar los precios de los productos en el carrito
  const updateCartPrices = async () => {
    if (cartItems.length === 0) return;
    
    try {
      const productIds = cartItems.map(item => item._id);
      
      const queryString = productIds.length > 0 ? `?ids=${productIds.join(',')}` : '';
      
      const response = await axios.get(`${URL}/products${queryString}`);
      const updatedProducts = response.data.products || response.data;
      
      // Crear un mapa de productos actualizados para búsqueda rápida
      const productMap = {};
      updatedProducts.forEach(product => {
        if (productIds.includes(product._id)) {
          productMap[product._id] = product;
        }
      });
      
      // Actualizar los precios de los productos en el carrito
      const updatedCartItems = cartItems.map(item => {
        // Si el producto existe en la base de datos, actualizar el precio
        if (productMap[item._id]) {
          return {
            ...item,
            price: productMap[item._id].price
          };
        }
        return item;
      });
      
      // Actualizar el estado del carrito si hay cambios
      if (JSON.stringify(updatedCartItems) !== JSON.stringify(cartItems)) {
        setCartItems(updatedCartItems);
        console.log('Precios del carrito actualizados');
      }
    } catch (error) {
      console.error("Error al actualizar precios del carrito:", error);
    }
  };

  // Funcion para agregar un producto al carrito
  const addToCart = async (product, quantity = 1) => {
    // Primero actualizar los precios 
    await updateCartPrices();
    
    setCartItems(prevItems => {
      // Verificamos si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
      
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
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  // actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === productId ? { ...item, quantity } : item
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

  // Funcioin para obtener todas las ordenes
  const getAllOrders = async () => {
    try {
      // Verificar si el usuario está autenticado
      if (!user || !token) {
        console.error("Usuario no autenticado");
        return { success: false, message: "Debes iniciar sesión para ver las órdenes" };
      }
  
      // Hacer la petición GET para obtener todas las órdenes
      const response = await axios.get(`${URL}/orders`, {
        headers: {
          access_token: token
        }
      });
  
      // Mostrar todas las órdenes por consola
      console.log("Todas las órdenes:", response.data.orders || response.data);
      
      return { 
        success: true, 
        orders: response.data.orders || response.data 
      };
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al obtener las órdenes" 
      };
    }
  };

  // Función para crear una orden
  const createOrder = async () => {
    try {
      // Actualizar precios antes de procesar la orden
      await updateCartPrices();
      
      // Verificar si hay productos en el carrito
      if (cartItems.length === 0) {
        return { success: false, message: "El carrito está vacío" };
      }
  
      // Verificar si el usuario esta autenticado
      if (!user || !token) {
        return { success: false, message: "Debes iniciar sesión para realizar una compra" };
      }
  
      // estructura de datos para la orden
      const orderData = {
        user: user._id,
        products: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalPrice
      };
  
      // Enviar la orden al backend
      const response = await axios.post(`${URL}/orders`, orderData, {
        headers: {
          access_token: token
        }
      });
  
      // Si la orden se crea correctamente, limpiar el carrito
      if (response.data.order) {
        clearCart();
        
        // Obtener todas las órdenes después de crear una nueva
        await getAllOrders();
      }
  
      return { success: true, order: response.data.order };
    } catch (error) {
      console.error("Error al crear la orden:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al procesar la compra" 
      };
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    createOrder,
    updateCartPrices,
    getAllOrders
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};