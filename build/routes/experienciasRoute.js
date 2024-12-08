"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experienciasControllers_1 = require("../controllers/experienciasControllers");
//import toNewUser from '../extras/utils'
const router = express_1.default.Router();
router.route('/')
    .get(experienciasControllers_1.findAllExperiencias)
    .post(experienciasControllers_1.createExperiencias);
router.route('/:id')
    .get(experienciasControllers_1.findExperiencias)
    .put(experienciasControllers_1.updateExperiencias)
    .delete(experienciasControllers_1.deleteExperiencias);
router.route('/user/:id')
    .get(experienciasControllers_1.findUsersFromExperiencias);
router.route('/Participant/:idExp/:idPart')
    .post(experienciasControllers_1.addParticipantToExperiencias)
    .delete(experienciasControllers_1.delParticipantToExperiencias);
router.route('/:id/habilitacion')
    .patch(experienciasControllers_1.toggleHabilitacionExperiencias);
exports.default = router;
