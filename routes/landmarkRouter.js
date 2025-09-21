import express from 'express';
import Landmark from '../model/Landmark.js';
const model = new Landmark();
const router = express.Router();

// obtener lugares turísticos
router.get('/', async (req, res) => {
    try {
        const list = await model.getLandmarks();
        res.json(list);
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Estamos presentando inconvenientes, intente nuevamente más tarde por favor."});
    }
});

// obtener lugar turístico x id
router.get('/:id', async (req, res) => {
    const {id}= req.params;
    const data = await model.getLandmarkById(id);
    
    if(data == 'Not Found'){
        res.status(404).json({msg: "Lugar turístico no encontrado."});
        return;
    }

    res.json(data);
});

// agregar un nuevo lugar turístico al json
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const {landmark_name, city, type, description, popularity} = body;
        if(!landmark_name || !city || !type || !description || !popularity) {
            res.status(400).json({msg: "Hay campos incompletos."});
            return;
        }
        const id = await model.addLandmark(body);
        res.status(200).json({msg: "Lugar turístico guardado", id});
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Estamos presentando inconvenientes, intente nuevamente más tarde por favor."});
    }
});

// eliminar un lugar turístico
router.delete('/:id', async (req, res) => {
    const {id}= req.params;
    const data = await model.deleteLandmarkById(id);
    
    if(data == 'Not Found'){
        res.status(404).json({msg: "Lugar turístico no encontrado."});
        return;
    }

    res.json(data);
});

// actualizar un lugar turístico
router.put('/:id', async (req, res) => {
    try {
        const {id}= req.params;
        const landmark = req.body;
        const {landmark_name, city, type, description, popularity} = landmark;
        if(!landmark_name || !city || !type || !description || !popularity) {
            res.status(400).json({msg: "Hay campos incompletos."});
            return;
        }

        const data = await model.updateLandmarkById(id, city);
    
        if(data == 'Not Found'){
            res.status(404).json({msg: "Lugar turístico no encontrado."});
            return;
        }

    } catch (error) {
        res.status(500).json({msg: "Estamos presentando inconvenientes, intente nuevamente más tarde por favor."});
        console.error(error);
    }
    


    res.json(data);
});

export default router;