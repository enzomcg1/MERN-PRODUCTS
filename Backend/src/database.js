const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dbtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // Salir del proceso en caso de error
    });
};

module.exports = connectDB;
