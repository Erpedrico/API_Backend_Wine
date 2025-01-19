import express, { RequestHandler } from 'express'
import cors from 'cors'
import userRouter from './routes/userRoute'
import experienciasRouter from './routes/experienciasRoute'
import wineRouter from './routes/wineRoute'
import chatRouter from './routes/chatRoute'
import grapeTypeRoute from './routes/grapeTypeRoute'
import { run } from './database/mongo_conn'
import initializeSocket from './utils/initializeSocket'

const app = express()
app.use(express.json())
run();

app.use(cors({
    allowedHeaders: ['Content-Type', 'auth-token'], // Agrega el encabezado `auth-token` a la lista de encabezados permitidos
    exposedHeaders: ['auth-token'],
    origin: '*', // Puedes reemplazar '*' con tu dominio específico si es necesario
    credentials: true,
}));

app.use(express.json() as RequestHandler);

//const PORT = 3000;
const PORT = 5000;

app.get('/ping', (_req, res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

app.use('/api/user', userRouter)
app.use('/api/experiencias', experienciasRouter)
app.use('/api/wine', wineRouter)
app.use('/api/chat', chatRouter)
app.use('/api/grapetypes', grapeTypeRoute);

const server = app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto ' + PORT)
})

initializeSocket(server);