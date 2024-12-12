import { Server } from 'socket.io';
import { messagesofDB } from '../modelos/type_d_message';
import { roomsofDB } from '../modelos/type_d_room';

const connectedUsers = new Set();

const socketService = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Connected successfully', socket.id);
    connectedUsers.add(socket.id);

    // Unirse a una sala específica
    socket.on('joinRoom', async (roomName: string) => {
      // Verificar si la sala existe en la base de datos
      let room = await roomsofDB.findOne({ name: roomName });
      console.log(roomName);
      if (!room) {
        // Crear la sala si no existe
        room = new roomsofDB({ name: roomName });
        await room.save();
      }

      // Unirse a la sala
      socket.join(roomName);

      // Obtener mensajes previos de la sala
      const previousMessages = await messagesofDB.find({ room: roomName }).sort({ timestamp: 1 });
      console.log(previousMessages);
      socket.emit('previousMessages', previousMessages);

      // Notificar a la sala sobre el nuevo usuario
      io.to(roomName).emit('connected-user', connectedUsers.size);
    });

    // Manejar envío de mensajes
    socket.on('sendMessage', async (data: { roomName: string; message: string }) => {
      const { roomName, message } = data;

      // Guardar el mensaje en la base de datos
      const newMessage = new messagesofDB({ room: roomName, content: message });
      await newMessage.save();

      // Emitir el mensaje a todos en la sala
      io.to(roomName).emit('message-receive', newMessage);
    });

    // Desconexión del usuario
    socket.on('disconnect', () => {
      console.log('Disconnected successfully', socket.id);
      connectedUsers.delete(socket.id);
      io.emit('connected-user', connectedUsers.size);
    });
  });
};

export default socketService;
