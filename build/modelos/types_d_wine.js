"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wineofDB = exports.wineSchema = void 0;
const mongoose_1 = require("mongoose");
exports.wineSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    price: Number,
    color: String,
    brand: String,
    grapetype: String,
    habilitado: Boolean
});
exports.wineofDB = (0, mongoose_1.model)('wine', exports.wineSchema);
