import express from 'express';
import dotenv from 'dotenv';
import routerAPI from './routes/index.js';
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/', express.static('public'));
routerAPI(app);

app.use((req, res, next) => {
    console.log('Te estoy vigilando 👀');
    next();
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenid@s a mi API de ciudades y lugares turísticos</h1>
        <ul>
        <li><a href="/api/cities">Ciudades</a></li>
        </ul>
        <ul>
        <li><a href="/api/landmarks">Lugares Turísticos</a></li>
        </ul>
        `);
});

console.log('API');

app.listen( port, () => {
    console.log(`Servidor Web en el puerto ${port}`);
});