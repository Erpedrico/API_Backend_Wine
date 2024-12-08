import express from 'express'
import { addFriend, addSolicitud, createUser, deleteUser, delFriend, delSolicitud, findAllUsers, findUser, logIn, toggleHabilitacion, updateUser, getUserExperiences, findUserByName, findUserByUserName } from '../controllers/userControllers'
import { TokenValidation } from '../middleware/verifyJWT'
import { verifyOwnership } from '../middleware/verifyOwner'
import { AdminValidation } from '../middleware/verifyAdmin'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    // .post(TokenValidation, AdminValidation, createUser)
    .post(createUser)

router.route('/:id')
    .get(TokenValidation, findUser)
    .put(TokenValidation, verifyOwnership, updateUser)
    .delete(TokenValidation, AdminValidation, deleteUser)

router.route('/all')
    .post(TokenValidation, AdminValidation, findAllUsers)

router.route('/logIn')
    .post(logIn)

router.route('/:id/habilitacion')
    .patch(toggleHabilitacion)

router.route('/friend/:name1/:name2')
    .get(addFriend)
    .delete(delFriend)

router.route('/solicitud/:name1/:name2')
    .get(addSolicitud)
    .delete(delSolicitud)

router.route('/findByName/:name')
    .get(findUserByName)

router.route('/experiences/all')
    .get(TokenValidation, getUserExperiences);

router.route('/findByUsername/:username')
    .get(findUserByUserName)

export default router