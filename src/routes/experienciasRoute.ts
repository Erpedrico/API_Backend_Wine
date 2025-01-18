import express from 'express'
import { getRatingsForExperience, addParticipantToExperiencias, addRatingToExperience, createExperiencia, deleteExperiencias, delParticipantToExperiencias, findAllExperiencias, findExperiencias, findUsersFromExperiencias, updateExperiencias, getExperiencesByOwner, addWineToExperience, createExperienciasFlutter } from '../controllers/experienciasControllers'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    .get(findAllExperiencias)
    .post(createExperiencia)
    

router.route('/flutter')
    .post(createExperienciasFlutter)

router.route('/:id')
    .get(findExperiencias)
    .put(updateExperiencias)
    .delete(deleteExperiencias)

router.route('/user/:id')
    .get(findUsersFromExperiencias)

router.route('/user/exp/:id')
    .get(getExperiencesByOwner);

router.route('/Participant/:idExp/:idPart')
    .post(addParticipantToExperiencias)
    .delete(delParticipantToExperiencias)

/*router.route('/:id/habilitacion')
    .patch(toggleHabilitacionExperiencias)
*/

// Ruta para añadir una valoración
router.route('/rate/:experienceId/:userId')
    .post(addRatingToExperience);

router.route('/addWine/:experienceId/:wineId')
    .post(addWineToExperience);

router.route('/ratings/:experienceId')
  .get(getRatingsForExperience) 

export default router