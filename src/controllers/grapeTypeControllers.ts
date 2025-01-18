import { Response } from 'express';
import GrapeTypeModel from '../modelos/type_d_grapetype';

export const getAllGrapeTypes = async (_: any, res: Response) => {
    try {
        const grapeTypes = await GrapeTypeModel.find().sort({ name: 1 });
        res.status(200).json(grapeTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch grape types' });
    }
};

