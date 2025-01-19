import express from 'express'
import { createWine, deleteWine, findAllWine, findWine, toggleHabilitacionWine, updateWine, getWinesByOwner } from '../controllers/wineControllers'
import { TokenValidation } from '../middleware/verifyJWT'
import { verifyOwnership } from '../middleware/verifyOwner'
import { AdminValidation } from '../middleware/verifyAdmin'

const router = express.Router()

router.route('/')
    .get(TokenValidation, findAllWine)
    .post(TokenValidation, createWine)

router.route('/owner/:id')
    .get(TokenValidation, getWinesByOwner);

router.route('/:id')
    .get(TokenValidation, findWine)
    .put(TokenValidation, AdminValidation, updateWine)
    .delete(TokenValidation, verifyOwnership, deleteWine)

router.route('/:id/habilitacion')
    .patch(TokenValidation, AdminValidation, toggleHabilitacionWine)

router.route('/create')
    .post(TokenValidation, createWine);

export default router