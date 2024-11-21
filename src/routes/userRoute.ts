import express from 'express';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUser,
  logIn,
  updateUser,
} from '../controllers/userControllers';
import { TokenValidation} from '../middleware/verifyJWT'
import { verifyOwnership } from '../middleware/verifyOwner'
import { AdminValidation} from '../middleware/verifyAdmin'
const router = express.Router();

// Ruta para crear un nuevo usuario
router.route('/')
  .post(createUser);

// Ruta para obtener, actualizar o eliminar usuario por ID
router.route('/:id')
  .get(TokenValidation, AdminValidation, findUser) // Validación de Token para obtener usuario
  .put(TokenValidation, verifyOwnership, updateUser) // Validación de Token para actualizar usuario
  .delete(TokenValidation, deleteUser); // Validación de Token para eliminar usuario

// Ruta para obtener todos los usuarios
router.route('/all')
  .post(TokenValidation, AdminValidation, findAllUsers); // Validación de Token y Admin para obtener todos los usuarios

// Ruta para iniciar sesión
router.route('/logIn')
  .post(logIn); // No se necesita verificación de token aquí


export default router;
