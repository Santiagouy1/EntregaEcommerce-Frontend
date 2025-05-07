import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import Titles from "../../components/titles/Titles";
import "./AdminProduct.css";
import { URL } from "../../config/env.config";

const AdminProduct = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [edicionModo, setEdicionModo] = useState(false);
  const [editarProductoId, setEditarProductoId] = useState(null);
  const URL_PRODUCTS = `${URL}/products`

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // obtener productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(URL_PRODUCTS);
      if (!response.ok) throw new Error("Error al cargar productos");
      const data = await response.json();
      
      // Verificamos si la respuesta contiene una propiedad 'products'
      if (data && data.products) {
        setProducts(data.products);
      } else {
        // Si no tiene la propiedad 'products', asumimos que la respuesta es el array directamente
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
      setProducts([]); // En caso de error, aseguramos que products sea un array vacío
    } finally {
      setLoading(false);
    }
  };

  // Manejo de edicion del producto
  const handleEdit = async (producto) => {
    setEdicionModo(true);
    setEditarProductoId(producto._id);
    return Promise.resolve();
  };

  // Manejo de eliminacion de producto
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${URL_PRODUCTS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar producto");

      setProducts(products.filter((producto) => producto._id !== id));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      // Si estamos editando este producto, cancelamos la edicion
      if (editarProductoId === id) {
        setEdicionModo(false);
        setEditarProductoId(null);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar envio del formulario crear / editar
  const handleSubmit = async (productData) => {
    setLoading(true);
    setError(null);
  
    try {
      let response;
      let method;
      let endpoint = URL_PRODUCTS;
  
      // En modo edicion se actualiza el producto existente
      if (edicionModo && editarProductoId) {
        method = "PUT";
        endpoint = `${URL_PRODUCTS}/${editarProductoId}`;
      } else {
        // Si no, se crea un nuevo producto
        method = "POST";
      }
  
      // Crear un FormData para enviar los datos, incluyendo imágenes
      const formData = new FormData();
      
      // Añadir cada campo del producto al FormData
      formData.append('product', productData.product);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('dateCreate', productData.dateCreate);
      
      if (productData.image) {
        formData.append('image', productData.image);
      } 
  
      response = await fetch(endpoint, {
        method: method,
        body: formData,
      });
  
      // Si no es una respuesta exitosa, obtener el mensaje de error 
      if (!response.ok) {
        let errorDetail = "";
        try {
          const errorData = await response.json();
          console.error("Datos de error del servidor:", errorData);
          errorDetail = errorData.message || "";
        } catch (e) {
          console.log(e);
        }
  
        throw new Error(`Error al ${edicionModo ? "actualizar" : "crear"} el producto` + 
                       (errorDetail ? `: ${errorDetail}` : ""));
      }
  
      // Procesar la respuesta exitosa
      const result = await response.json();
      
      // Obtener el producto de la respuesta 
      const resultProduct = result.product || result;
  
      if (edicionModo) {
        // Actualizar el producto en la lista
        setProducts(
          products.map((producto) =>
            producto._id === editarProductoId ? resultProduct : producto
          )
        );
        // Salir de modo edición
        setEdicionModo(false);
        setEditarProductoId(null);
      } else {
        // Agregar el nuevo producto a la lista
        setProducts([...products, resultProduct]);
      }
  
      // Mostrar mensaje de éxito
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
  
      // Actualizar la lista de productos
      fetchProducts();
      
      return true; // Indicar éxito
    } catch (err) {
      console.error("Error completo:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funcion para cancelar la edicion
  const handleCancelEdit = () => {
    setEdicionModo(false);
    setEditarProductoId(null);
  };

  return (
    <main className="main-container">
      <div className="userTitle">
        <Titles titulo={"Administrador de Productos"} />
      </div>
      <div className="parent">
        <ProductForm
          loading={loading}
          edicionModo={edicionModo}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
          initialProduct={
            editarProductoId
              ? products.find((p) => p._id === editarProductoId)
              : null
          }
          error={error}
          success={success}
        />

        <ProductTable
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
};

export default AdminProduct;