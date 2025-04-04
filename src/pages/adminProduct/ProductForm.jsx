import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SubTitle from "../../components/titles/Subtitle";

const ProductForm = ({
  loading,
  edicionModo,
  onSubmit,
  onCancel,
  initialProduct,
  error,
  success,
}) => {
  const [urlImagen, setUrlImagen] = useState("");
  const imageInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: "",
      product: "",
      description: "",
      price: "",
      category: "",
      dateCreate: "",
    },
  });

  // Cargar datos del producto al editar
  useEffect(() => {
    if (initialProduct) {
      setValue("image", initialProduct.image);
      setValue("product", initialProduct.product);
      setValue("description", initialProduct.description);
      setValue("price", initialProduct.price);
      setValue("category", initialProduct.category);
      setValue("dateCreate", initialProduct.dateCreate);
      setUrlImagen(initialProduct.image);

      // Mover al formulario y enfocar el campo de imagen
      if (typeof document !== "undefined" && document.documentElement) {
        const formulario = document.getElementById("formulario");
        if (formulario) {
          formulario.scrollIntoView({ behavior: "smooth" });
          
          setTimeout(() => {
            if (imageInputRef.current) {
              imageInputRef.current.focus();
            }
          }, 500);
        }
      }
    }
  }, [initialProduct, setValue]);

  // Resetear formulario cuando se cambia el modo de edición
  useEffect(() => {
    if (!edicionModo) {
      reset();
      setUrlImagen("");
    }
  }, [edicionModo, reset]);

  const submitHandler = (data) => {
    const productData = {
      ...data,
      image: urlImagen,
    };

    const success = onSubmit(productData);
    if (success) {
      reset();
      setUrlImagen("");
    }
  };

  return (
    <div className="formNewProducts" id="formulario">
      <SubTitle title={edicionModo ? "Editar Producto" : "Agregar Producto"} />

      {error && <div className="error-message">{error}</div>}

      {success && (
        <div className="mensaje-exito">La operacion se realizo con exito!</div>
      )}

      <form className="formulario-container" onSubmit={handleSubmit(submitHandler)}>
        <div className="input-group">
          <input
            className={`input-group-form ${errors.image ? "input-error" : ""}`}
            type="url"
            id="image"
            {...register("image", {
              required: "La imagen del producto es obligatoria",
            })}
            value={urlImagen}
            ref={imageInputRef}
            onChange={(e) => setUrlImagen(e.target.value)}
          />
          <label className="label-group" htmlFor="image">
            URL de la Imagen
          </label>
          {errors.image && (
            <p className="error-message">{errors.image.message}</p>
          )}
        </div>

        <div className="input-group">
          <input
            className={`input-group-form ${errors.product ? "input-error" : ""}`}
            type="text"
            id="product"
            {...register("product", {
              required: "El nombre del producto es obligatorio",
            })}
          />
          <label className="label-group" htmlFor="product">
            Nombre del Producto
          </label>
          {errors.product && (
            <p className="error-message">{errors.product.message}</p>
          )}
        </div>

        <div className="input-group">
          <textarea
            className={`input-group-form ${
              errors.description ? "input-error" : ""
            }`}
            type="text"
            id="description"
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
          />
          <label className="label-group" htmlFor="description">
            Descripción
          </label>
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>

        <div className="input-group">
          <input
            className={`input-group-form ${errors.price ? "input-error" : ""}`}
            type="number"
            id="price"
            {...register("price", {
              required: "El precio es obligatorio",
              valueAsNumber: true,
            })}
          />
          <label className="label-group" htmlFor="price">
            Precio
          </label>
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </div>

        <div className="input-group">
          <select
            className={`input-group-form ${errors.category ? "input-error" : ""}`}
            id="category"
            {...register("category", {
              required: "La categoría es obligatoria",
            })}
          >
            <option value="">Seleccionar Categoría</option>
            <option value="celulares">Celulares</option>
            <option value="tablets">Tablets</option>
            <option value="auriculares">Auriculares</option>
          </select>
          <label className="label-group" htmlFor="category">
            Categoría
          </label>
          {errors.category && (
            <p className="error-message">{errors.category.message}</p>
          )}
        </div>

        <div className="input-group">
          <input
            className={`input-group-form ${
              errors.dateCreate ? "input-error" : ""
            }`}
            type="date"
            id="dateCreate"
            {...register("dateCreate", {
              required: "La fecha de creación es obligatoria",
              validate: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(value);
                selectedDate.setHours(0, 0, 0, 0);
                if (selectedDate > today) {
                  return "La fecha de creación no puede ser futura.";
                }
                return true;
              },
            })}
          />
          <label className="label-group" htmlFor="dateCreate">
            Fecha de Creación
          </label>
          {errors.dateCreate && (
            <p className="error-message">{errors.dateCreate.message}</p>
          )}
        </div>

        <div className="form-buttons">
          <button
            className="btn-formulario-container"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Procesando..."
              : edicionModo
              ? "Actualizar Producto"
              : "Crear Producto"}
          </button>

          {edicionModo && (
            <button
              className="btn-formulario-container btnEliminarForm"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;