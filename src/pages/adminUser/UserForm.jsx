import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SubTitles from "../../components/titles/SubTitles";

const UserForm = ({ onSubmit, editMode, userToEdit, onCancelEdit, loading }) => {
  const nameInputRef = useRef(null);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthDate: "",
      department: "",
      role: "",
    }
  });

  // Cargar datos del usuario a editar
  useEffect(() => {
    if (editMode && userToEdit) {
      setValue("name", userToEdit.name);
      setValue("email", userToEdit.email);
      setValue("role", userToEdit.role === "admin" ? "admin" : "user");
      if (userToEdit.birthDate) {
        const date = new Date(userToEdit.birthDate);
        const formattedDate = date.toISOString().split('T')[0];
        setValue("birthDate", formattedDate);
      }
      setValue("department", userToEdit.department);
      setValue("password", "");
      
      // Scroll al formulario y focus
      const formulario = document.getElementById("formulario");
      if (formulario) {
        formulario.scrollIntoView({ behavior: "smooth" });
        
        setTimeout(() => {
          if (nameInputRef.current) {
            nameInputRef.current.focus();
          }
        }, 500);
      }
    }
  }, [editMode, userToEdit, setValue]);

  const submitForm = async (data) => {
    const userData = {
      ...data,
      role: data.role === "admin" ? "admin" : "user"
    };

    if (userData.birthDate) {
      const date = new Date(userData.birthDate);
      userData.birthDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }

    // Si la contraseña esta vacia en modo edicion, se elimina
    if (editMode && !userData.password) {
      delete userData.password;
    }
    const success = await onSubmit(userData, editMode);
    
    if (success) {
      reset();
    }
  };

  return (
    <div className="formNewUser" id="formulario">
      <SubTitles title={editMode ? "Editar Usuario" : "Agregar Usuario"} />

      <form className="formulario-container" onSubmit={handleSubmit(submitForm)}>
        <div className="input-group">
          <input
            className={`input-group-form ${errors.name ? 'input-error' : ''}`}
            type="text"
            id="name"
            placeholder="Nombre Completo"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres"
              },
              maxLength: {
                value: 35,
                message: "El nombre no debe tener más de 35 caracteres"
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "El nombre solo puede contener letras (sin acentos)"
              }
            })}
            ref={(e) => {
              register("name").ref(e);
              nameInputRef.current = e;
            }}
          />
          <label className="label-group" htmlFor="name">Nombre Completo</label>
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        
        <div className="input-group">
          <input
            className={`input-group-form ${errors.email ? 'input-error' : ''}`}
            type="email"
            id="mail"
            placeholder="Correo Electrónico"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /[A-Za-z0-9._+\-']+@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/,
                message: "El correo electrónico no es válido"
              }
            })}
          />
          <label className="label-group" htmlFor="mail">Correo Electrónico</label>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        
        <div className="input-group">
          <input
            className={`input-group-form ${errors.password ? 'input-error' : ''}`}
            type="password"
            id="password"
            placeholder="Contraseña"
            {...register("password", {
              required: !editMode ? "La contraseña es obligatoria" : false,
              minLength: editMode ? false : {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              },
              maxLength: editMode ? false : {
                value: 100,
                message: "La contraseña no debe tener más de 100 caracteres"
              },
              pattern: editMode ? false : {
                value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/,
                message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
              }
            })}
          />
          <label className="label-group" htmlFor="password">Contraseña</label>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        
        <div className="input-group">
          <input
            className={`input-group-form ${errors.birthDate ? 'input-error' : ''}`}
            type="date"
            id="birthDate"
            {...register("birthDate", {
              required: "La fecha de nacimiento es obligatoria"
            })}
          />
          <label className="label-group" htmlFor="birthDate">Fecha Nacimiento</label>
          {errors.birthDate && <p className="error-message">{errors.birthDate.message}</p>}
        </div>
        
        <div className="input-group-admin">
          <select
            id="role"
            className={errors.role ? 'input-error' : ''}
            {...register("role", {
              required: "Debe seleccionar un rol"
            })}
          >
            <option value="">Seleccionar rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
          <label className="label-group" htmlFor="role"></label>
          {errors.role && <p className="error-message">{errors.role.message}</p>}
        </div>
        
        <div className="input-group-departamento">
          <select
            id="department"
            className={errors.department ? 'input-error' : ''}
            {...register("department", {
              required: "Debe seleccionar un departamento"
            })}
          >
            <option value="">Selecciona tu departamento</option>
            <option value="artigas">Artigas</option>
            <option value="canelones">Canelones</option>
            <option value="cerro-largo">Cerro Largo</option>
            <option value="colonia">Colonia</option>
            <option value="durazno">Durazno</option>
            <option value="flores">Flores</option>
            <option value="florida">Florida</option>
            <option value="lavalleja">Lavalleja</option>
            <option value="maldonado">Maldonado</option>
            <option value="montevideo">Montevideo</option>
            <option value="paysandu">Paysandú</option>
            <option value="rio-negro">Río Negro</option>
            <option value="rivera">Rivera</option>
            <option value="rocha">Rocha</option>
            <option value="salto">Salto</option>
            <option value="san-jose">San José</option>
            <option value="soriano">Soriano</option>
            <option value="tacuarembo">Tacuarembó</option>
            <option value="treinta-y-tres">Treinta y Tres</option>
          </select>
          <label className="label-group" htmlFor="department"></label>
          {errors.department && <p className="error-message">{errors.department.message}</p>}
        </div>

        <div className="form-buttons">
          <button 
            className="btn-formulario-container" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Procesando..." : editMode ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
          
          {editMode && (
            <button 
              className="btn-formulario-container btnEliminarForm" 
              type="button" 
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;