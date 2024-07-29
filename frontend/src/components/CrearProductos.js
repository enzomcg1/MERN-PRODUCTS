import React, { useState } from 'react';
import axios from 'axios';

const CrearUsuario = () => {
  const valorInicial = {
    nombre: '',
    descripcion: '',
    precio: 0
  };

  const [usuarioSchema, setUsuario] = useState(valorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuarioSchema,
      [name]: value
    });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/productos', usuarioSchema);
      setUsuario(valorInicial);
      alert('Producto guardado con éxito');
    } catch (error) {
      console.error('Error guardando el producto:', error);
      alert('Hubo un error guardando el producto. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center">Agregar producto</h2>
          <div className="mb-3">
            <label>Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Ingresar el nombre del producto"
              value={usuarioSchema.nombre}
              onChange={capturarDatos}
              required
            />
          </div>

          <div className="mb-3">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="form-control"
              placeholder="Ingresar la descripción del producto"
              value={usuarioSchema.descripcion}
              onChange={capturarDatos}
              required
            />
          </div>

          <div className="mb-3">
            <label>Precio</label>
            <input
              type="number"
              name="precio"
              className="form-control"
              placeholder="Ingresar precio del producto"
              value={usuarioSchema.precio}
              onChange={capturarDatos}
              required
            />
          </div>

          <button className="btn btn-primary form-control" type="submit">
            Guardar producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
