import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producto');
        setLista(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsuarios();
  }, []);

  return (
    <div className='row'>
      {lista.map(list => (
        <div className='col-md-4 p-2' key={list.id}>
          <div className='card'>
            <div className='card-header'>
              <h4>Nombre del producto: {list.producto}</h4>
              <p>Descripcio del producto: {list.descri}</p>
              <p>precio del producto: {list.precio} PYG</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuario;