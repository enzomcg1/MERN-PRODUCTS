import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [usuario, setUsuario] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', usuario);
            alert('Usuario registrado correctamente');
            navigate('/login');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h2 className="text-center mb-4">Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Ingrese su email"
                            value={usuario.email}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary form-control mt-4">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Registro;
