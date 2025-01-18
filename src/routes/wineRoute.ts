import express from 'express'
import { createWine, deleteWine, findAllWine, findWine, toggleHabilitacionWine, updateWine } from '../controllers/wineControllers'
import { TokenValidation } from '../middleware/verifyJWT'
import { verifyOwnership } from '../middleware/verifyOwner'
import { AdminValidation } from '../middleware/verifyAdmin'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    .get(TokenValidation, findAllWine)
    .post(TokenValidation, createWine)

router.route('/:id')
    .get(TokenValidation, AdminValidation, findWine)
    .put(TokenValidation, AdminValidation, updateWine)
    .delete(TokenValidation, verifyOwnership, deleteWine)

router.route('/:id/habilitacion')
    .patch(TokenValidation, AdminValidation, toggleHabilitacionWine)

router.route('/create')
    .post(TokenValidation, createWine);

export default router