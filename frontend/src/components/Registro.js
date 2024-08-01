import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
    const [usuario, setUsuario] = useState({ email: '', password: '' });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const onChange = e => setUsuario({ ...usuario, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', {
                email: usuario.email,
                password: usuario.password
            });
            setMensaje(response.data.message);
            setError('');
        } catch (error) {
            // Si error.response o error.response.data no están definidos, manejamos el error adecuadamente
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Error al registrar usuario');
            }
            setMensaje('');
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h2 className="text-center mb-4">Registro</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Ingrese su email"
                            value={usuario.email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            value={usuario.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary form-control mt-4">Registrar</button>
                </form>
                {mensaje && <p className="mt-3 text-success text-center">{mensaje}</p>}
                {error && <p className="mt-3 text-danger text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Registro;
