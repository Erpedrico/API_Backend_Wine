import { experienciasInterface } from '../modelos/types_d_experiencias'
import * as experienciasServices from '../services/experienciasServices'
import { Request, Response } from 'express'
import * as userServices from '../services/userServices'

export async function findAllExperiencias(_req:Request,res:Response):Promise<Response> {
    try{
        const experiencias:experienciasInterface[]|null = await experienciasServices.getEntries.getAll()
        return res.json(experiencias);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find all experiencies' });
    }
}

export async function findExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        const experiencies:experienciasInterface|null = await experienciasServices.getEntries.findById(req.params.id)
        return res.json(experiencies);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find experiencies' });
    }
}

export async function findUsersFromExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        const experiencies:experienciasInterface|null = await experienciasServices.getEntries.findUserById(req.params.id)
    return res.json(experiencies);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find experiencies' });
    }
}

export async function createExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        console.log(req.body)
        const experiencias:experienciasInterface|null = await experienciasServices.getEntries.create(req.body as object)
        return res.status(200).json(experiencias)
    } catch(e){
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


export async function updateExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        const experiencias:experienciasInterface|null = await experienciasServices.getEntries.update(req.params.id,req.body as object)
        return res.status(200).json(experiencias);
    } catch(e){
        return res.status(500).json({ e: 'Failed to update experiencies' });
    }
}

export async function deleteExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        const experiencias:experienciasInterface|null = await experienciasServices.getEntries.delete(req.params.id)
        return res.json(experiencias);
    } catch(e){
        return res.status(500).json({ e: 'Failed to delete experiencies' });
    }
}

export async function delParticipantToExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        const experiencias:experienciasInterface|null = await experienciasServices.getEntries.delParticipant(req.params.idExp,req.params.idPart)
        return res.json(experiencias);
    } catch(e){
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

export async function addRatingToExperience(req: Request, res: Response): Promise<Response> {
    try {
        // Acceder a los parámetros de la URL
        const { experienceId, userId } = req.params;  // Tomamos los parámetros de la URL

        // Acceder al rating del cuerpo de la solicitud
        const { ratingValue } = req.body;  // Valor de la valoración que se pasa en el cuerpo de la petición
        console.log(ratingValue)
        // Verificar que los datos de la valoración son válidos
        if (ratingValue == null || ratingValue < 0 || ratingValue > 5) {
            return res.status(400).json({ message: "Rating value must be between 0 and 5" });
        }

        // Buscar el objeto completo del usuario usando su ID
        const user = await userServices.getEntries.findById(userId); // Asegúrate de tener un método getById que te devuelva el objeto de usuario

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Llamar al servicio para añadir la valoración con el objeto completo de usuario
        const experience = await experienciasServices.getEntries.addRating(experienceId, userId, ratingValue);

        if (!experience) {
            return res.status(404).json({ message: "Experience not found or already rated by this user" });
        }

        return res.status(200).json({ message: "Rating added successfully", experience });
    } catch (error) {
        console.error('Error adding rating:', error);

        // Verificar si el error tiene un mensaje
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return res.status(500).json({ message: 'Failed to add rating to experience', error: errorMessage });
    }
}



