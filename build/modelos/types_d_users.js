"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersofDB = exports.usersSchema = void 0;
const mongoose_1 = require("mongoose");
exports.usersSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    comment: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['admin', 'wineLover', 'wineMaker'] },
    habilitado: { type: Boolean, required: true },
    amigos: [{ type: String, required: true }],
    solicitudes: [{ type: String, required: true }]
});
exports.usersofDB = (0, mongoose_1.model)('user', exports.usersSchema);
