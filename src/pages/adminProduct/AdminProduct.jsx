import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import Titles from "../../components/titles/Titles";
import "./AdminProduct.css";

const AdminProduct = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [edicionModo, setEdicionModo] = useState(false);
  const [editarProductoId, setEditarProductoId] = useState(null);
  const URL_PRODUCTS = "https://67cb832e3395520e6af589a3.mockapi.io/products";

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
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manejo de edicion del producto
  const handleEdit = async (producto) => {
    setEdicionModo(true);
    setEditarProductoId(producto.id);
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

      setProducts(products.filter((producto) => producto.id !== id));

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

      response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(
          `Error al ${edicionModo ? "actualizar" : "agregar"} producto`
        );
      }

      const resultProduct = await response.json();

      if (edicionModo) {
        // Actualizar el producto en la lista
        setProducts(
          products.map((producto) =>
            producto.id === editarProductoId ? resultProduct : producto
          )
        );
        // Salir de modo edicion
        setEdicionModo(false);
        setEditarProductoId(null);
      } else {
        // Agregar el nuevo producto a la lista
        setProducts([...products, resultProduct]);
      }

      // Mostrar mensaje de exito
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
      return false;
    } finally {
      setLoading(false);
    }
    return true;
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
              ? products.find((p) => p.id === editarProductoId)
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