import express from 'express'
import { delExperienciaFromUser, addFriend, addSolicitud, createUser, deleteUser, delFriend, delSolicitud, findAllUsers, findNameById, findUser, logIn, toggleHabilitacion, updateUser, getUserExperiences, findUserByName, findUserByUserName, addExperienciaToParticipant, reactGoogleLoginLover, reactGoogleLoginMaker, getUserProfileByUsername } from '../controllers/userControllers'
import { TokenValidation } from '../middleware/verifyJWT'
import { AdminValidation } from '../middleware/verifyAdmin'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    // .post(TokenValidation, AdminValidation, createUser)
    .post(createUser)

router.route('/:id')
    .get(TokenValidation, findUser)
    .put(TokenValidation, updateUser)
    .delete(TokenValidation, deleteUser)

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

router.route('/profile/:id')
    .get(TokenValidation, findUser)

router.route('/addExpToPart/:idExp/:idPart')
    .post(addExperienciaToParticipant)

router.route('/reactGoogleLoginMaker')
    .post(reactGoogleLoginMaker);

router.route('/reactGoogleLoginLover')
    .post(reactGoogleLoginLover);

router.route('/usersId/:id')
     .get(findNameById);
    
router.route('/profile/username/:username')
    .get(TokenValidation, getUserProfileByUsername);

router.route('/updateUser/:userId')
    .put(TokenValidation, updateUser);

router.route('/experiences/:id')
    .get(TokenValidation, getUserExperiences);

router.route('/delExperienciaFromUser/:experienceId/:userId')
  .delete(delExperienciaFromUser);

export default router