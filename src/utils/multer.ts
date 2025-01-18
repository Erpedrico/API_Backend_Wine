import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

const storage: StorageEngine = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'winer-app',
        format: async () => 'png',
        public_id: (_req: Request, file: Express.Multer.File) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage });

export default upload;
