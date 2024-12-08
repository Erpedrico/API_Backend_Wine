"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const verifyJWT_1 = require("../middleware/verifyJWT");
const verifyOwner_1 = require("../middleware/verifyOwner");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
//import toNewUser from '../extras/utils'
const router = express_1.default.Router();
router.route('/')
    .post(userControllers_1.createUser);
router.route('/:id')
    .get(verifyJWT_1.TokenValidation, userControllers_1.findUser)
    .put(verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, userControllers_1.updateUser)
    .delete(verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, userControllers_1.deleteUser);
router.route('/all')
    .post(verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userControllers_1.findAllUsers);
router.route('/logIn')
    .post(userControllers_1.logIn);
router.route('/:id/habilitacion')
    .patch(userControllers_1.toggleHabilitacion);
router.route('/friend/:idUser/:friend')
    .post(userControllers_1.addFriend)
    .delete(userControllers_1.delFriend);
exports.default = router;
