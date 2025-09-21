import express from 'express';
import City from '../model/City.js';
const model = new City();
const router = express.Router();

// obtener ciudades
router.get('/', async (req, res) => {
    try {
        const list = await model.getCities();
        res.json(list);
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Estamos presentando inconvenientes, intente nuevamente más tarde por favor."});
    }
});

// obtener ciudad x id
router.get('/:id', async (req, res) => {
    const {id}= req.params;
    const data = await model.getCityById(id);
    
    if(data == 'Not Found'){
        res.status(404).json({msg: "Ciudad no encontrada."});
        return;
    }

    res.json(data);
});

// agregar una nueva ciudad al json
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const {city_name, country, continent, language, climate} = body;
        if(!city_name || !country || !continent || !language || !climate) {
            res.status(400).json({msg: "Hay campos incompletos."});
            return;
        }
        const id = await model.addCity(body);
        res.status(200).json({msg: "Ciudad guardada", id});
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Estamos presentando inconvenientes, intente nuevamente más tarde por favor."});
    }
});

// eliminar una ciudad
router.delete('/:id', async (req, res) => {
    const {id}= req.params;
    const data = await model.deleteCityById(id);
    
    if(data == 'Not Found'){
        res.status(404).json({msg: "Ciudad no encontrada."});
        return;
    }

    res.json(data);
});

// actualizar una ciudad
router.put('/:id', async (req, res) => {
    try {
        const {id}= req.params;
        const city = req.body;
        const {city_name, country, continent, language, climate} = city;
        if(!city_name || !country || !continent || !language || !climate) {
            res.status(400).json({msg: "Hay campos incompletos."});
            return;
        }

        const data = await model.updateCityById(id, city);
    
        if(data == 'Not Found'){
            res.status(404).json({msg: "Ciudad no encontrada."});
            return;
        }

    } catch (error) {
        res.status(500).json({msg: "Estamos presentando inconvenientes, intente nuevamente más tarde por favor."});
        console.error(error);
    }
    


    res.json(data);
});

export default router;