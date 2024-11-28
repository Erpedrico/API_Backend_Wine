import { pageInterface } from '../modelos/type_d_extras'
import { usersInterface, UsersInterfacePrivateInfo } from '../modelos/types_d_users'
import * as userServices from '../services/userServices'
import * as experienciasServices from '../services/experienciasServices'
import * as wineServices from '../services/wineServices'
import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'

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
        const user: usersInterface | null = await userServices.getEntries.findById(req.params.id)
        return res.json(user);
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
                { username: user.username, tipo: user.tipo },
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


export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { username } = req.body as UsersInterfacePrivateInfo;

        // Comprobar si el username ya existe
        const existingUser: usersInterface | null = await userServices.getEntries.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username en uso' });
        }

        console.log("Creando usuario...");

        // Crear el usuario
        const newUser: usersInterface | null = await userServices.getEntries.create(req.body as object);

        // Responder con el usuario creado
        return res.status(201).json(newUser);

    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ error: 'Failed to create user' });
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
        const user: string | null = await userServices.getEntries.findIdByName(req.params.name);
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find user' });
    }
}
