import { Request, Response } from 'express';
import { roomsofDB } from '../modelos/type_d_room';
import { messagesofDB } from '../modelos/type_d_message';
import * as userServices from '../services/userServices';


// Obtener las salas de un usuario
export const getRoomsForUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        // Obtener los títulos de las experiencias del usuario
        const userExperiences = await userServices.getEntries.findUserExperiencesByUsername(username);

        if (!userExperiences || userExperiences.length === 0) {
            return res.status(404).json({ error: 'User not found or no experiences available' });
        }

        // Obtener las salas relacionadas con el usuario
        const rooms = await roomsofDB.find({ name: { $regex: username } });

        // Formatear las experiencias como objetos de sala
        const experienceRooms = userExperiences.map((title: string) => ({ name: title }));

        // Combinar las salas del usuario y las experiencias
        const roomsWithExperiences = [...rooms, ...experienceRooms];

        return res.status(200).json(roomsWithExperiences); // Retorno explícito
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch rooms' }); // Manejo de error explícito
    }
};


// Obtener los mensajes de una sala
export const getMessagesForRoom = async (req: Request, res: Response) => {
    const { roomName } = req.params;

    try {
        const messages = await messagesofDB.find({ room: roomName }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};
