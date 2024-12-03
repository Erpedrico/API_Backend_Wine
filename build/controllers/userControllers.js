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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = findAllUsers;
exports.findUser = findUser;
exports.logIn = logIn;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.addFriend = addFriend;
exports.delFriend = delFriend;
exports.toggleHabilitacion = toggleHabilitacion;
const userServices = __importStar(require("../services/userServices"));
const experienciasServices = __importStar(require("../services/experienciasServices"));
const wineServices = __importStar(require("../services/wineServices"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function findAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { paginas, numerodecaracterespp } = req.body;
            const user = yield userServices.getEntries.getAll(paginas, numerodecaracterespp);
            return res.json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to find all user' });
        }
    });
}
function findUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.getEntries.findByUsername(req.params.id);
            return res.json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to find user' });
        }
    });
}
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            console.log(username, password);
            const user = yield userServices.getEntries.findIdAndPassword(username, password);
            if (user != null) {
                const token = jsonwebtoken_1.default.sign({ username: user.username, tipo: user.tipo }, process.env.SECRET || 'tokentest');
                return res.header('auth-token', token).json(user);
            }
            else {
                return res.status(400).json({ message: 'User or password incorrect' });
            }
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to find user' });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /*const { username } = req.body as UsersInterfacePrivateInfo;
            const name:usersInterface|null = await userServices.getEntries.findByUsername(username)
            if (name==null){
                return res.status(404).json({ message: 'Username en uso' });
            } */
            const user = yield userServices.getEntries.create(req.body);
            console.log(user);
            const token = jsonwebtoken_1.default.sign({ username: user.username, tipo: user.tipo }, process.env.SECRET || 'tokentest');
            return res.header('auth-token', token).json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to create user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.getEntries.update(req.params.id, req.body);
            return res.status(200).json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to update user' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.getEntries.delete(req.params.id);
            yield experienciasServices.getEntries.findByOwnerandDelete(req.params.id);
            yield wineServices.getEntries.findByOwnerandDelete(req.params.id);
            return res.json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to delete user' });
        }
    });
}
function addFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.getEntries.addFriend(req.params.name1, req.params.name2);
            yield userServices.getEntries.addFriend(req.params.name2, req.params.name1);
            return res.json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to add friend' });
        }
    });
}
function delFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.getEntries.delFriend(req.params.name1, req.params.name2);
            yield userServices.getEntries.delFriend(req.params.name2, req.params.name1);
            return res.json(user);
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to add friend' });
        }
    });
}
function toggleHabilitacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { habilitado } = req.body; // Obtener el nuevo estado de habilitación del cuerpo de la petición
            if (typeof habilitado !== 'boolean') {
                return res.status(400).json({ message: 'El campo habilitado debe ser un valor booleano' });
            }
            // Actualizar el campo habilitado del usuario
            const user = yield userServices.getEntries.update(req.params.id, { habilitado });
            if (user) {
                yield experienciasServices.getEntries.findByOwnerandUpdate(user === null || user === void 0 ? void 0 : user.name, { habilitado });
                yield wineServices.getEntries.findByOwnerandUpdate(user === null || user === void 0 ? void 0 : user.name, { habilitado });
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }
        catch (e) {
            return res.status(500).json({ e: 'Failed to update user habilitation' });
        }
    });
}
