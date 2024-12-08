import { experienciasInterface } from '../modelos/types_d_experiencias'
import * as experienciasServices from '../services/experienciasServices'
import { Request, Response } from 'express'

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
        const experiencias:experienciasInterface|null = await experienciasServices.getEntries.create(req.body as object)
        return res.status(200).json(experiencias)
    } catch(e){
        return res.status(500).json({ e: 'Failed to create experiencies' });
    }

}

export async function addParticipantToExperiencias(req:Request,res:Response):Promise<Response> {
    try{
        const experiencias:experienciasInterface|null = await experienciasServices.getEntries.addParticipant(req.params.idExp,req.params.idPart)
        return res.json(experiencias);
    } catch(e){
        return res.status(500).json({ e: 'Failed to add participant' });
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