import express from 'express';
import LandmarkController from '../controllers/LandmarkController.js';

const router = express.Router();

router.post('/', LandmarkController.postLandmark);
router.get('/', LandmarkController.getLandmarks);
router.get('/:id', LandmarkController.getLandmarkById);
router.delete('/:id', LandmarkController.deleteLandmarkById);
router.put('/:id', LandmarkController.updateLandmarkById);

export default router;