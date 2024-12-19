import { experienciasInterface } from '../modelos/types_d_experiencias'
import * as experienciasServices from '../services/experienciasServices'
import { Request, Response } from 'express'

export async function findAllExperiencias(_req: Request, res: Response): Promise<Response> {
    try {
        const experiencias: experienciasInterface[] | null = await experienciasServices.getEntries.getAll()
        return res.json(experiencias);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find all experiencies' });
    }
}

export async function findExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        const experiencies: experienciasInterface | null = await experienciasServices.getEntries.findById(req.params.id)
        return res.json(experiencies);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find experiencies' });
    }
}

export async function findUsersFromExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        const experiencies: experienciasInterface | null = await experienciasServices.getEntries.findUserById(req.params.id)
        return res.json(experiencies);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find experiencies' });
    }
}

export async function createExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        console.log(req.body)
        const experiencias: experienciasInterface | null = await experienciasServices.getEntries.create(req.body as object)
        return res.status(200).json(experiencias)
    } catch (e) {
        return res.status(500).json({ e: 'Failed to create experiencies' });
    }
}

export async function addParticipantToExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        // Llama al servicio para añadir el participante a la experiencia
        const experiencias: experienciasInterface | null = await experienciasServices.getEntries.addParticipant(
            req.params.idExp,
            req.params.idPart
        );

        if (!experiencias) {
            return res.status(404).json({ message: 'Experience not found' }); // Verifica si la experiencia existe
        }

        return res.json(experiencias); // Devuelve la experiencia actualizada
    } catch (error) {
        console.error('Error adding participant:', error); // Log para depuración
        return res.status(500).json({ message: 'Failed to add participant' });
    }
}


export async function updateExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        const experiencias: experienciasInterface | null = await experienciasServices.getEntries.update(req.params.id, req.body as object)
        return res.status(200).json(experiencias);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to update experiencies' });
    }
}

export async function deleteExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        const experiencias: experienciasInterface | null = await experienciasServices.getEntries.delete(req.params.id)
        return res.json(experiencias);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to delete experiencies' });
    }
}

export async function delParticipantToExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        const experiencias: experienciasInterface | null = await experienciasServices.getEntries.delParticipant(req.params.idExp, req.params.idPart)
        return res.json(experiencias);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to del participant' });
    }
}

export async function toggleHabilitacionExperiencias(req: Request, res: Response): Promise<Response> {
    try {
        const { habilitado } = req.body;  // Obtener el nuevo estado de habilitación del cuerpo de la petición

        if (typeof habilitado !== 'boolean') {
            return res.status(400).json({ message: 'El campo habilitado debe ser un valor booleano' });
        }

        // Actualizar el campo habilitado del usuario
        const experiencia = await experienciasServices.getEntries.update(req.params.id, { habilitado });

        if (experiencia) {
            return res.status(200).json(experiencia);
        } else {
            return res.status(404).json({ message: 'Experiencia no encontrado' });
        }
    } catch (e) {
        return res.status(500).json({ e: 'Failed to update user habilitation' });
    }
}

export async function updateRating(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params; // ID de la experiencia
        const { rating } = req.body; // Puntuación enviada por el frontend
        const { userId } = req.user; // Supongamos que el `userId` está en `req.user` gracias a un middleware de autenticación

        // Validación: El rating debe ser un número entre 0 y 5
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'El rating debe ser un número entre 0 y 5' });
        }

        // Validación: Asegúrate de que el `userId` esté presente
        if (!userId) {
            return res.status(400).json({ message: 'Se requiere un usuario autenticado' });
        }

        // Actualizar el rating en la base de datos
        const updatedExperience = await experienciasServices.getEntries.updateRating(id, userId, rating);

        if (updatedExperience) {
            return res.status(200).json(updatedExperience);
        } else {
            return res.status(404).json({ message: 'Experiencia no encontrada' });
        }
    } catch (error) {
        console.error('Error updating rating:', error);
        return res.status(500).json({ message: 'Error al actualizar el rating' });
    }
}
