const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        user = new User({ email, password, username });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error en el registro:', error.message);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error en el login:', error.message);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

exports.getUser = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            console.error('Error al obtener usuario:', error.message);
            res.status(500).json({ message: 'Error al obtener usuario' });
        }
    });
};

exports.updateUser = async (req, res) => {
    verifyToken(req, res, async () => {
        const { email, password, username } = req.body;
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            user.email = email || user.email;
            user.username = username || user.username;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
            await user.save();
            res.json({ message: 'Usuario actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar usuario:', error.message);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    });
};

exports.deleteUser = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error.message);
            res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    });
};
