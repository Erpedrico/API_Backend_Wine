import express from 'express'
import { createUser, deleteUser, findAllUsersNoPagination, findPaginatedUsers, findUser, logIn, updateUser } from '../controllers/userControllers'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    .post(createUser)

router.route('/:id')
    .get(findUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/all')
    .get(findAllUsersNoPagination);
    
router.route('/logIn')
    .post(logIn)

router.route('/paginated')
    .post(findPaginatedUsers)

export default router