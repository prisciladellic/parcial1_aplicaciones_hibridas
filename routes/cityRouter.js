import express from 'express';
import CityController from '../controllers/CityController.js';

const router = express.Router();

router.post('/', CityController.postCity);
router.get('/', CityController.getCities);
router.get('/:id', CityController.getCityById);
router.delete('/:id', CityController.deleteCityById);
router.put('/:id', CityController.updateCityById);

export default router;