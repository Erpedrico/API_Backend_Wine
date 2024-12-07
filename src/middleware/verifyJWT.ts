import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle'


interface IPayload {
    username: string;
    tipo: 'admin' | 'wineLover' | 'wineMaker';
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    console.log('Verifying token');
    // Recoge el token escrito en el header
    const token = req.header('auth-token');
    console.log('Token:', token); // Imprime el token en la consola
    // Comprobamos 
    if (!token) return handleHttp(res, 'Access denied', 'No token provided');

    try {
        // Obtenemos de nuevo las datos codificadas del token
        const payload = jwt.verify(token, process.env.SECRET || 'tokentest') as IPayload;
        req.user = payload;
        console.log('User added to request:', req.user); // Asegúrate de que req.user contiene los datos
        next();
    } catch (error) {
        handleHttp(res, 'Your token is not valid', error);
    }
};