import express from 'express';
import { updateImage } from '../controllers/imageController';
import multer from '../utils/multer';

const router = express.Router();

// Ruta genérica para subir cualquier imagen
router.route('/update-image/:type/:id')
    .post(multer.single('image'), updateImage);

export default router;
