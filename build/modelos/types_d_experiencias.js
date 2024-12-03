"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienciasofDB = exports.experienciasSchema = void 0;
const mongoose_1 = require("mongoose");
exports.experienciasSchema = new mongoose_1.Schema({
    owner: String,
    participants: [String],
    description: String,
    tipo: String,
    habilitado: Boolean
});
exports.experienciasofDB = (0, mongoose_1.model)('experiencias', exports.experienciasSchema);
