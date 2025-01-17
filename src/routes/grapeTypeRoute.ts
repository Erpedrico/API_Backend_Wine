import express from 'express';
import { getAllGrapeTypes } from '../controllers/grapeTypeControllers';

const router = express.Router();

router.get('/', getAllGrapeTypes);

export default router;
