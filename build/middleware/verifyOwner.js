"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwnership = void 0;
const userServices = __importStar(require("../services/userServices"));
const error_handle_1 = require("../utils/error.handle");
const verifyOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log('verficant usuari');
        const userIdToActOn = req.params.id; // ID del usuario objetivo
        const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username; // Verificamos si req.user existe
        const tipo = (_b = req.user) === null || _b === void 0 ? void 0 : _b.tipo;
        if (tipo == 'admin') {
            console.log('Es admin');
            next();
        }
        if (username == undefined) {
            return res.json('no tienes nombre de usuario');
        }
        const user = yield userServices.getEntries.findByUsername(username);
        const currentUserId = user === null || user === void 0 ? void 0 : user._id;
        console.log(user);
        console.log(userIdToActOn, currentUserId);
        // Comprueba si el usuario actual tiene permiso
        if (currentUserId === userIdToActOn) {
            // Si tiene permiso, pasamos al siguiente middleware
            console.log('vamos a hacer next');
            return next();
        }
        return res.json('no eres propietario');
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Internal server error', error);
    }
});
exports.verifyOwnership = verifyOwnership;
