import express from 'express';
import { getRoomsForUser, getMessagesForRoom } from '../controllers/chatControllers';

const router = express.Router();

// Obtener todas las salas de un usuario
router.get('/rooms/:username', getRoomsForUser);

// Obtener todos los mensajes de una sala
router.get('/messages/:roomName', getMessagesForRoom);

export default router;
