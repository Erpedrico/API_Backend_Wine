import express from 'express'
import { createUser, deleteUser, findAllUsers, findUser, findUserByName, logIn, toggleHabilitacion, updateUser, getUserExperiences } from '../controllers/userControllers'
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

router.route('/findByName/:name')
    .get(findUserByName)

router.route('/experiences')
    .get(TokenValidation, getUserExperiences);


export default router