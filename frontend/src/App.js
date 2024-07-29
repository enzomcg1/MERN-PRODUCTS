import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import ListaProductos from './components/ListaProductos';
import Registro from './components/Registro';
import Login from './components/Login';
import CrearProductos from './components/CrearProductos';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <div className="">
            <Navegacion />
            <div className="container p-4">
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<ListaProductos />} />
                            <Route path="/CrearProducto" element={<CrearProductos />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Registro />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;