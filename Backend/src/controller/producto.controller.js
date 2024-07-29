const Producto = require('../models/producto');

// Crear un nuevo producto
const createUsu = async (req, res) => {
    try {
        const newProducto = new Producto(req.body);
        await newProducto.save();
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error });
    }
};

// Obtener todos los productos
const getUsu = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Obtener un producto específico por ID
const getUsuario = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Actualizar un producto por ID
const updateUsu = async (req, res) => {
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto por ID
const deleteUsu = async (req, res) => {
    try {
        const deletedProducto = await Producto.findByIdAndDelete(req.params.id);
        if (!deletedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

module.exports = { createUsu, getUsu, getUsuario, deleteUsu, updateUsu };
