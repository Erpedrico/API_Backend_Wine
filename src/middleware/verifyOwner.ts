import { Request, Response, NextFunction } from 'express';
import * as userServices from "../services/userServices";
import { handleHttp } from '../utils/error.handle'
import { usersfromDBInterface } from '../modelos/types_d_users';

export const verifyOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('verficant usuari')
        const userIdToActOn = req.params.id; // ID del usuario objetivo
        const username = req.user?.username; // Verificamos si req.user existe
        const tipo = req.user?.tipo;
        if (tipo=='admin'){
            console.log('Es admin');
            next();
        }

        if (username==undefined){
            return res.json('no tienes nombre de usuario');
        }
        const user: usersfromDBInterface | null = await userServices.getEntries.findByUsername(username);
        const currentUserId = user?._id;
        console.log(user);

        console.log(userIdToActOn, currentUserId);

        // Comprueba si el usuario actual tiene permiso
        if (currentUserId === userIdToActOn) {
            // Si tiene permiso, pasamos al siguiente middleware
            console.log('vamos a hacer next');
            return next(); 
        }
        return res.json('no eres propietario');

    } catch (error) {
        handleHttp(res, 'Internal server error', error); 
    }
};
