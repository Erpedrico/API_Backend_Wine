import { pageInterface } from '../modelos/type_d_extras'
import { usersInterface, UsersInterfacePrivateInfo } from '../modelos/types_d_users'
import * as userServices from '../services/userServices'
import * as experienciasServices from '../services/experienciasServices'
import * as wineServices from '../services/wineServices'
import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'

export async function findAllUsers(req:Request,res:Response):Promise<Response> {
    try{
        const {paginas, numerodecaracterespp} = req.body as pageInterface;
        const user:usersInterface[]|null = await userServices.getEntries.getAll(paginas, numerodecaracterespp);
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find all user' });
    }
}

export async function findUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.findById(req.params.id)
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function logIn(req:Request,res:Response):Promise<Response> {
    try{
        const { username,password } = req.body as UsersInterfacePrivateInfo;
        console.log(username, password);
        const user:usersInterface|null = await userServices.getEntries.findIdAndPassword(username, password);
        if (user!=null){
            const token: string = jwt.sign({username: user.username, tipo: user.tipo}, process.env.SECRET || 'tokentest')
            return res.header('auth-token', token).json(user); 
        } else {
            return res.status(400).json({message:'User or password incorrect'})
        }
    } catch(e){
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function createUser(req:Request,res:Response):Promise<Response> {
    try{
        const { username } = req.body as UsersInterfacePrivateInfo;
        const name:usersInterface|null = await userServices.getEntries.findByUsername(username)
        if (name==null){
            return res.status(404).json({ message: 'Username en uso' });
        } 
        const user:usersInterface|null = await userServices.getEntries.create(req.body as object)
        const token: string = jwt.sign({username: user.username,tipo: user.tipo}, process.env.SECRET || 'tokentest')
        return res.header('auth-token', token).json(user); 
    } catch(e){
        return res.status(500).json({ e: 'Failed to create user' });
    }
}

export async function updateUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.update(req.params.id,req.body as object)
        return res.status(200).json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to update user' });
    }
}

export async function deleteUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.delete(req.params.id);
        await experienciasServices.getEntries.findByOwnerandDelete(req.params.id);
        await wineServices.getEntries.findByOwnerandDelete(req.params.id);
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to delete user' });
    }
}

export async function toggleHabilitacion(req: Request, res: Response): Promise<Response> {
    try {
        const { habilitado } = req.body;  // Obtener el nuevo estado de habilitación del cuerpo de la petición
        
        if (typeof habilitado !== 'boolean') {
            return res.status(400).json({ message: 'El campo habilitado debe ser un valor booleano' });
        }

        // Actualizar el campo habilitado del usuario
        const user = await userServices.getEntries.update(req.params.id, { habilitado });

        if (user) {
            await experienciasServices.getEntries.findByOwnerandUpdate(user?.name, { habilitado });
            await wineServices.getEntries.findByOwnerandUpdate(user?.name, { habilitado });
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (e) {
        return res.status(500).json({ e: 'Failed to update user habilitation' });
    }
}

