import { Request, Response } from 'express';
import * as userServices from '../services/userServices';
import * as wineServices from '../services/wineServices';
import * as experienciasServices from '../services/experienciasServices';

export const updateImage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { type, id } = req.params; // Los parámetros `type` (user, wine, experience) y `id`.
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        let updatedEntity;

        if (type === 'user') {
            updatedEntity = await userServices.getEntries.update(id, { image: file.path });
        } else if (type === 'wine') {
            updatedEntity = await wineServices.getEntries.update(id, { image: file.path });
        } else if (type === 'experience') {
            updatedEntity = await experienciasServices.getEntries.update(id, { image: file.path });
        } else {
            return res.status(400).json({ message: 'Invalid type parameter' });
        }

        if (!updatedEntity) {
            return res.status(404).json({ message: `${type} not found` });
        }

        return res.status(200).json({
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} image updated successfully`,
            [type]: updatedEntity,
        });
    } catch (error) {
        console.error('Error updating image:', error);
        return res.status(500).json({ message: 'Failed to update image' });
    }
};
