"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wineControllers_1 = require("../controllers/wineControllers");
//import toNewUser from '../extras/utils'
const router = express_1.default.Router();
router.route('/')
    .get(wineControllers_1.findAllWine)
    .post(wineControllers_1.createWine);
router.route('/:id')
    .get(wineControllers_1.findWine)
    .put(wineControllers_1.updateWine)
    .delete(wineControllers_1.deleteWine);
router.route('/:id/habilitacion')
    .patch(wineControllers_1.toggleHabilitacionWine);
exports.default = router;
