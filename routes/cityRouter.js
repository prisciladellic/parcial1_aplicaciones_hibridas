import express from 'express';
import { postCity, getCities, getCityById, deleteCityById, updateCityById } from '../controllers/cityController.js';

const router = express.Router();

router.post('/', postCity);
router.get('/', getCities);
router.get('/:id', getCityById);
router.delete('/:id', deleteCityById);
router.put('/:id', updateCityById);

export default router;