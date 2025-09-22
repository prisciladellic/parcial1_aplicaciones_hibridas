import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routerAPI from './routes/index.js';
dotenv.config();

// variables entorno
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;

// conexión con la base de datos
mongoose.connect(URI_DB);
const db = mongoose.connection;
db.on('error', () => {console.error('No fue posible establecer conexión con la base de datos 🔴')});
db.on('open', () => {console.info('Conexión con la base de datos correctamente establecida 🟢')});

const app = express();
app.use(express.json());
app.use('/', express.static('public'));

// middleware
app.use((req, res, next) => {
    console.log('Te estoy vigilando 👀');
    next();
});

routerAPI(app);

app.listen( PORT, () => {
    console.log(`Servidor Web en el puerto ${PORT}`);
});