import { Request, Response } from 'express';
import { roomsofDB } from '../modelos/type_d_room';
import { messagesofDB } from '../modelos/type_d_message';

// Obtener las salas de un usuario
export const getRoomsForUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const rooms = await roomsofDB.find({ name: { $regex: username } });
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
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
