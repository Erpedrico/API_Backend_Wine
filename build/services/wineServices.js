"use strict";
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
exports.getEntries = void 0;
const types_d_wine_1 = require("../modelos/types_d_wine");
//import userData from './users.json'
exports.getEntries = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.find();
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.findById(id);
    }),
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.create(entry);
    }),
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    findByOwnerandUpdate: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.findOneAndUpdate({ owner: id }, body).exec();
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.findByIdAndDelete(id);
    }),
    findByOwnerandDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_wine_1.wineofDB.findOneAndDelete({ owner: id }).exec();
    })
};
