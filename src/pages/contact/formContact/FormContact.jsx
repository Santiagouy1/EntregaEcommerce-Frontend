import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './FormContact.css'

const FormContact = () => {
  // Estado para mensaje de éxito
  const [enviado, setEnviado] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      mensaje: ''
    }
  });

  // Funcion para manejar el envio exitoso
  const onSubmit = async (data) => {
    try {
      console.log('Datos enviados:', data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpiar formulario y mostrar mensaje de enviado
      reset();
      setEnviado(true);
      
      setTimeout(() => {
        setEnviado(false);
      }, 3000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <>
      
      <form className="formulario-container-contact" onSubmit={handleSubmit(onSubmit)}>

        <div className="input-group-contact">

          <label className="label-group-contact" htmlFor="nombre">
            Nombre
          </label>

          <input
            className={`input-group-form-contact ${errors.nombre ? 'input-error' : ''}`}
            id="nombre"
            placeholder="Joe..."
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 4,
                message: 'El nombre debe tener al menos 4 caracteres'
              },
              maxLength: {
                value: 30,
                message: 'El nombre no debe tener mas de 30 caracteres'
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: 'El nombre solo puede contener letras'
              }
            })}
          />
          {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
        </div>
        
        <div className="input-group-contact">
          <label className="label-group-contact" htmlFor="apellido">
            Apellido
          </label>
          <input
            className={`input-group-form-contact ${errors.apellido ? 'input-error' : ''}`}
            id="apellido"
            placeholder="Doe..."
            {...register('apellido', {
              required: 'El apellido es obligatorio',
              minLength: {
                value: 4,
                message: 'El apellido debe tener al menos 4 caracteres'
              },
              maxLength: {
                value: 30,
                message: 'El apellido no debe tener mas de 30 caracteres'
              },
              pattern: {
                value: /^[a-zA-Z ñ]+$/,
                message: 'El apellido solo puede contener letras'
              }
            })}
          />
          {errors.apellido && <p className="error-message">{errors.apellido.message}</p>}
        </div>
        
        <div className="input-group-contact">
          <label className="label-group-contact" htmlFor="email">
            Mail
          </label>
          <input
            className={`input-group-form-contact ${errors.email ? 'input-error' : ''}`}
            id="email"
            placeholder="Gmail"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /[A-Za-z0-9._+\-']+@[A-Za-z0-9.]+[A-Za-z]{2,}$/,
                message: 'El email no es válido'
              }
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        
        <div className="input-group-contact">
          <label className="label-mensaje" htmlFor="mensaje">
            Mensaje
          </label>
          <textarea 
            id="mensaje" 
            rows="5"
            className={`${errors.mensaje ? 'input-error' : ''}`}
            {...register('mensaje', {
              required: 'El mensaje es obligatorio'
            })}
          ></textarea>
          {errors.mensaje && <p className="error-message">{errors.mensaje.message}</p>}
        </div>
        
        <button className="btn-formulario-container-contact" type="submit">
          Enviar
        </button>

        {enviado && (
        <div className="mensaje-exito">
          Mensaje enviado correctamente ! Pronto estaremos en contacto.
        </div>
        
      )}

      </form>
    </>
  );
};

export default FormContact;
