import express from 'express'
import { getRatingsForExperience, addParticipantToExperiencias, addRatingToExperience, createExperiencias, deleteExperiencias, delParticipantToExperiencias, findAllExperiencias, findExperiencias, findUsersFromExperiencias, updateExperiencias, getExperiencesByOwner, addWineToExperience } from '../controllers/experienciasControllers'

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

router.route('/user/exp/:id')
    .get(getExperiencesByOwner);

router.route('/Participant/:idExp/:idPart')
    .post(addParticipantToExperiencias)
    .delete(delParticipantToExperiencias)

/*router.route('/:id/habilitacion')
    .patch(toggleHabilitacionExperiencias)
*/
// Rutas para añadir valoraciones
// Ruta para añadir una valoración
router.route('/rate/:experienceId/:userId')
    .post(addRatingToExperience);

router.route('/ratings/:id')
    .get(getRatingsForExperience)

router.route('/addWine/:experienceId/:wineId')
    .post(addWineToExperience);


export default router