import { pageInterface } from '../modelos/type_d_extras'
import { usersInterface, UsersInterfacePrivateInfo } from '../modelos/types_d_users'
import * as userServices from '../services/userServices'
import * as experienciasServices from '../services/experienciasServices'
import * as wineServices from '../services/wineServices'
import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function findAllUsers(req: Request, res: Response): Promise<Response> {
    try {
        const { paginas, numerodecaracterespp } = req.body as pageInterface;
        const user: usersInterface[] | null = await userServices.getEntries.getAll(paginas, numerodecaracterespp);
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find all user' });
    }
}

export async function findUser(req: Request, res: Response): Promise<Response> {
    try {
        const messagep: string = 'No encontrado'
        const user: usersInterface | null = await userServices.getEntries.findById(req.params.id)
        if (user == null) {
            console.log('Este es');
            return res.status(201).json(messagep);
        } else {
            return res.status(200).json(user);
        }
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function logIn(req: Request, res: Response): Promise<Response> {
    try {
        const { username, password } = req.body as UsersInterfacePrivateInfo;

        // Verifica los valores de username y password recibidos en el backend
        console.log("Received username and password:", username, password);

        // Buscar el usuario en la base de datos
        const user: usersInterface | null = await userServices.getEntries.findIdAndPassword(username, password);

        if (user != null) {
            // Si el usuario es encontrado, genera el token JWT
            const token: string = jwt.sign(
                { _id: user._id, username: user.username, tipo: user.tipo },
                process.env.SECRET || 'tokentest'
            );

            // Verifica que el login haya sido exitoso y muestra los datos
            console.log("Login completed successfully, user found:", user);
            console.log("Generated token:", token); // Muestra el token generado

            // Responde con el usuario y el token
            return res.json({ user, token }); // Enviar tanto el usuario como el token
        } else {
            // Si el usuario no se encuentra, responde con un error
            return res.status(400).json({ message: 'User or password incorrect' });
        }
    } catch (e) {
        // Si ocurre un error, se maneja con un error 500
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function reactGoogleLogin(req: Request, res: Response): Promise<Response> {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }
        const user = await userServices.getEntries.findOrCreateGoogleUser(payload);
        const jwtToken = jwt.sign({ _id: user._id, username: user.username, tipo: user.tipo }, process.env.SECRET || 'tokentest');
        return res.json({ user, token: jwtToken });
    } catch (e) {
        return res.status(500).json({ e: 'Failed to login with Google' });
    }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        /*const { username } = req.body as UsersInterfacePrivateInfo;
        const name:usersInterface|null = await userServices.getEntries.findByUsername(username)
        if (name==null){
            return res.status(404).json({ message: 'Username en uso' });
        } */
        const user: usersInterface | null = await userServices.getEntries.create(req.body as usersInterface)
        console.log(user);
        const token: string = jwt.sign({ username: user.username, tipo: user.tipo }, process.env.SECRET || 'tokentest')
        return res.header('auth-token', token).json({ user, token });
    } catch (e) {
        return res.status(500).json({ e: 'Failed to create user' });
    }
}



export async function updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const user: usersInterface | null = await userServices.getEntries.update(req.params.id, req.body as object)
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to update user' });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        const user: usersInterface | null = await userServices.getEntries.delete(req.params.id);
        await experienciasServices.getEntries.findByOwnerandDelete(req.params.id);
        await wineServices.getEntries.findByOwnerandDelete(req.params.id);
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to delete user' });
    }
}

export async function addFriend(req: Request, res: Response): Promise<Response> {
    try {
        const user: usersInterface | null = await userServices.getEntries.addFriend(req.params.name1, req.params.name2)
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to add friend' });
    }
}

export async function delFriend(req: Request, res: Response): Promise<Response> {
    try {
        const user: usersInterface | null = await userServices.getEntries.delFriend(req.params.name1, req.params.name2)
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to add friend' });
    }
}

export async function addSolicitud(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Processing addSolicitud for:', req.params.name1, req.params.name2);
        const user = await userServices.getEntries.addSolicitud(req.params.name1, req.params.name2);
        console.log('Solicitud added for user:', user);
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) { // Verifica que el error es una instancia de Error
            if (error.message === 'User not found') {
                console.error('Error in addSolicitud:', error.message);
                return res.status(404).json({ message: 'User not found' });
            }
            console.error('Error in addSolicitud:', error.message);
        }
        return res.status(500).json({ message: 'Failed to add friend request' });
    }
}



export async function delSolicitud(req: Request, res: Response): Promise<Response> {
    try {
        const user: usersInterface | null = await userServices.getEntries.delSolicitud(req.params.name1, req.params.name2)
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to add friend' });
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

export async function findUserByName(req: Request, res: Response): Promise<Response> {
    try {
        const user: string | null = await userServices.getEntries.findIdByName(req.params.id);
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function getUserExperiences(req: Request, res: Response): Promise<Response> {
    try {
        const user = await userServices.getEntries.findUserExperiences(req.user._id);
        console.log('User fetched:', user); // Verifica si se encuentra el usuario
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verifica que las experiencias estén correctamente pobladas
        console.log('User experiences:', user.experiences);
        return res.json({ experiences: user.experiences }); // Envía las experiencias completas al frontend

    } catch (error) {
        console.error('Failed to fetch user experiences:', error);
        return res.status(500).json({ error: 'Failed to fetch user experiences' });
    }
}

export async function findUserByUserName(req: Request, res: Response): Promise<Response> {
    try {
        const user: usersInterface | null = await userServices.getEntries.findByUsername(req.params.username)
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find user' });
    }
}
/*
export async function addExperienciaToParticipant(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.addExperiencia(req.params.idExp,req.params.idPart)
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to add exp' });
    }
}*/

export async function addExperienciaToParticipant(req: Request, res: Response): Promise<Response> {
    try {
        // Llama al servicio para añadir la experiencia al usuario
        const user: usersInterface | null = await userServices.getEntries.addExperiencia(
            req.params.idExp, // ID de la experiencia
            req.params.idPart // ID del participante
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Verifica si el usuario existe
        }

        return res.status(200).json(user); // Devuelve el usuario actualizado
    } catch (error) {
        console.error('Error adding experience to participant:', error); // Log para depuración
        return res.status(500).json({ message: 'Failed to add experience to participant' });
    }
}

