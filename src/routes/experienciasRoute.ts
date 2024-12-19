import express from 'express'
import { addParticipantToExperiencias, createExperiencias, deleteExperiencias, delParticipantToExperiencias, findAllExperiencias, findExperiencias, findUsersFromExperiencias, toggleHabilitacionExperiencias, updateExperiencias, updateRating } from '../controllers/experienciasControllers'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    .get(findAllExperiencias)
    .post(createExperiencias)

router.route('/:id')
    .get(findExperiencias)
    .put(updateExperiencias)
    .delete(deleteExperiencias)
    
    
router.route('/user/:id')
    .get(findUsersFromExperiencias) 

router.route('/Participant/:idExp/:idPart')
    .post(addParticipantToExperiencias)
    .delete(delParticipantToExperiencias)    

router.route('/:id/habilitacion')
    .patch(toggleHabilitacionExperiencias)

router.route('/:id/ratings')
    .patch(updateRating)


export default router