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
exports.findAllExperiencias = findAllExperiencias;
exports.findExperiencias = findExperiencias;
exports.findUsersFromExperiencias = findUsersFromExperiencias;
exports.createExperiencias = createExperiencias;
exports.addParticipantToExperiencias = addParticipantToExperiencias;
exports.updateExperiencias = updateExperiencias;
exports.deleteExperiencias = deleteExperiencias;
exports.delParticipantToExperiencias = delParticipantToExperiencias;
exports.toggleHabilitacionExperiencias = toggleHabilitacionExperiencias;
const experienciasServices = __importStar(require("../services/experienciasServices"));
function findAllExperiencias(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencias = yield experienciasServices.getEntries.getAll();
            return res.json(experiencias);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to find all experiencies' });
        }
    });
}
function findExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencies = yield experienciasServices.getEntries.findById(req.params.id);
            return res.json(experiencies);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to find experiencies' });
        }
    });
}
function findUsersFromExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencies = yield experienciasServices.getEntries.findUserById(req.params.id);
            return res.json(experiencies);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to find experiencies' });
        }
    });
}
function createExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencias = yield experienciasServices.getEntries.create(req.body);
            return res.status(200).json(experiencias);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to create experiencies' });
        }
    });
}
function addParticipantToExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencias = yield experienciasServices.getEntries.addParticipant(req.params.idExp, req.params.idPart);
            return res.json(experiencias);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to add participant' });
        }
    });
}
function updateExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencias = yield experienciasServices.getEntries.update(req.params.id, req.body);
            return res.status(200).json(experiencias);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to update experiencies' });
        }
    });
}
function deleteExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencias = yield experienciasServices.getEntries.delete(req.params.id);
            return res.json(experiencias);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to delete experiencies' });
        }
    });
}
function delParticipantToExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experiencias = yield experienciasServices.getEntries.delParticipant(req.params.idExp, req.params.idPart);
            return res.json(experiencias);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to del participant' });
        }
    });
}
function toggleHabilitacionExperiencias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { habilitado } = req.body; // Obtener el nuevo estado de habilitación del cuerpo de la petición
            if (typeof habilitado !== 'boolean') {
                return res.status(400).json({ message: 'El campo habilitado debe ser un valor booleano' });
            }
            // Actualizar el campo habilitado del usuario
            const experiencia = yield experienciasServices.getEntries.update(req.params.id, { habilitado });
            if (experiencia) {
                return res.status(200).json(experiencia);
            }
            else {
                return res.status(404).json({ message: 'Experiencia no encontrado' });
            }
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to update user habilitation' });
        }
    });
}
