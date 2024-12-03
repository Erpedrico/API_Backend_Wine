import express from 'express'
import { addFriend, createUser, deleteUser, delFriend, findAllUsers, findUser, logIn, toggleHabilitacion, updateUser } from '../controllers/userControllers'
import { TokenValidation} from '../middleware/verifyJWT'
import { verifyOwnership } from '../middleware/verifyOwner'
import { AdminValidation} from '../middleware/verifyAdmin'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    .post(createUser)

router.route('/:id')
    .get(TokenValidation, findUser)
    .put(TokenValidation, verifyOwnership, updateUser)
    .delete(TokenValidation, verifyOwnership, deleteUser)

router.route('/all')
    .post(TokenValidation, AdminValidation, findAllUsers)

router.route('/logIn')
    .post(logIn)

router.route('/:id/habilitacion')
  .patch(toggleHabilitacion)

router.route('/friend/:idUser/:friend')
  .post(addFriend)
  .delete(delFriend)    

    
export default router