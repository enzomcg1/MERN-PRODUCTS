const app = require('./app');
const connectDB = require('./database');


// Conectar a la base de datos
connectDB();


// Configurar el puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
