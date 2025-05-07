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
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const imageInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      setValue("product", initialProduct.product);
      setValue("description", initialProduct.description);
      setValue("price", initialProduct.price);
      setValue("category", initialProduct.category);
      
      if (initialProduct.dateCreate) {
        const dateObj = new Date(initialProduct.dateCreate);
        const formattedDate = dateObj.toISOString().split('T')[0];
        setValue("dateCreate", formattedDate);
      }
      
      // mostrar vista previa de la imagen
      if (initialProduct.image) {
        setPreviewImage(`${import.meta.env.VITE_FILES_URL}/products/${initialProduct.image}`);
      }

      // Mover al formulario y enfocar el primer campo
      if (typeof document !== "undefined" && document.documentElement) {
        const formulario = document.getElementById("formulario");
        if (formulario) {
          formulario.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [initialProduct, setValue]);

  // Resetear formulario cuando se cambia el modo de edición
  useEffect(() => {
    if (!edicionModo) {
      reset();
      setPreviewImage("");
      setSelectedFile(null);
    }
  }, [edicionModo, reset]);

  // Maneja el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Almacenar el archivo seleccionado
      setSelectedFile(file);
      
      // Crear URL para vista previa
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      
    } else {
      setSelectedFile(null);
      setPreviewImage("");
    }
  };

  const submitHandler = async (data) => {
    // Validar imagen requerida para nuevos productos
    if (!edicionModo && !selectedFile) {
      alert("Debes seleccionar una imagen para el producto");
      return;
    }
    
    // Crear objeto con los datos del formulario
    const productData = {
      ...data,
      image: selectedFile,
    };
    
    // Enviar datos al componente padre
    const success = await onSubmit(productData);
    
    if (success) {
      reset();
      setPreviewImage("");
      setSelectedFile(null);
      // limpiar el input de archivo
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="formNewProducts" id="formulario">
      <SubTitle title={edicionModo ? "Editar Producto" : "Agregar Producto"} />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="mensaje-exito">
          La operación se realizó con éxito!
        </div>
      )}

      <form className="formulario-container" onSubmit={handleSubmit(submitHandler)}>
        <div className="input-group">
          <input
            className={`input-group-form ${errors.image ? "input-error" : ""}`}
            type="file"
            accept="image/*"
            id="image"
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          <label className="label-group" htmlFor="image">
            Imagen del Producto *
          </label>
          
          {/* Vista previa de la imagen */}
          {previewImage && (
            <div className="image-preview">
              <img 
                src={previewImage} 
                alt="Vista previa" 
                className="preview-image"
              />
            </div>
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
            Nombre del Producto *
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
            id="description"
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
          />
          <label className="label-group" htmlFor="description">
            Descripción *
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
            step="0.01"
            {...register("price", {
              required: "El precio es obligatorio",
              valueAsNumber: true,
              validate: value => value > 0 || "El precio debe ser mayor que cero"
            })}
          />
          <label className="label-group" htmlFor="price">
            Precio *
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
            Categoría *
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
            Fecha de Creación *
          </label>
          {errors.dateCreate && (
            <p className="error-message">{errors.dateCreate.message}</p>
          )}
        </div>

        <div className="form-buttons">
          <button
            className="btn-formulario-container"
            type="submit"
            disabled={loading || (!edicionModo && !selectedFile)}
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