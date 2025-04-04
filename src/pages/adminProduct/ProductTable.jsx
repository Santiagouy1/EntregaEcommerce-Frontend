import BotonEliminar from "../../components/botonEliminar/BotonEliminar";
import BotonEditar from "../../components/botonEditar/BotonEditar";

const ProductTable = ({ products, loading, onEdit, onDelete }) => {
  if (loading && !products.length) {
    return <p className="loading">Cargando productos...</p>;
  }

  if (products.length === 0 && !loading) {
    return <p className="no-products">No hay productos registrados</p>;
  }

  return (
    <div className="newProduct">
      <div className="container-table">
        <table className="table-product">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="product-item">
                <td className="image-cell">
                  <img
                    loading="lazy"
                    src={product.image}
                    alt={product.product}
                    className="table-image"
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                </td>
                <td className="name-cell">
                  <div className="text-name-cell">{product.product}</div>
                </td>
                <td className="category-cell">
                  <div className="text-name-cell">{product.category}</div>
                </td>
                <td className="description-cell">
                  <div className="text-description-cell">
                    {product.description}
                  </div>
                </td>
                <td className="price-cell">USD {product.price}</td>
                <td className="tools-cell">
                  <div className="icon-container">
                    <BotonEditar
                      onEdit={() => onEdit(product)}
                      itemType="producto"
                      itemName={product.product}
                      className="btn btnEditarProducts"
                    />
                    <BotonEliminar
                      onDelete={() => onDelete(product.id)}
                      itemType="producto"
                      itemName={product.product}
                      className="btn btnEliminar"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;