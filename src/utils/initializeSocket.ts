import { Server } from 'socket.io';
import socketService from '../services/chatServices';

const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Permite todas las conexiones, ajusta según sea necesario
        },
    });
    socketService(io);
};

export default initializeSocket;
