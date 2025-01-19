import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

const storage: StorageEngine = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'winer-app', // El nombre de la carpeta en Cloudinary
        format: async (_req: Request, file: Express.Multer.File): Promise<string> => {
            const ext = file.originalname.split('.').pop()?.toLowerCase();
            if (ext && ['jpg', 'jpeg', 'png'].includes(ext)) {
                return ext; // Devolver la extensión válida
            }
            return 'png'; // Devolver un formato predeterminado si la extensión no es válida
        },
        public_id: (_req: Request, file: Express.Multer.File): string =>
            `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
    } as Record<string, any>, // Evitar errores de tipado
});

// Configuración para filtrar extensiones permitidas
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar archivo
    } else {
        cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed!')); // Rechazar archivo
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo del archivo: 5 MB
});

export default upload;
