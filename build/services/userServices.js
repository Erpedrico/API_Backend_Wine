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
const types_d_users_1 = require("../modelos/types_d_users");
//import userData from './users.json'
exports.getEntries = {
    getAll: (num1, num2) => __awaiter(void 0, void 0, void 0, function* () {
        const rnum = num1 * num2;
        return yield types_d_users_1.usersofDB.aggregate([
            { $skip: rnum },
            { $limit: num2 }
        ]);
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findById(id);
    }),
    findIdAndPassword: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        // Si falla quitar el name:name por name, pero no deberia.
        return yield types_d_users_1.usersofDB.findOne({ username: username }).exec()
            .then(userResponse => {
            if (userResponse == null || userResponse.password != password) {
                return null;
            }
            else {
                return userResponse;
            }
        });
    }),
    findByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(username);
        return yield types_d_users_1.usersofDB.findOne({ username: username });
    }),
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.create(entry);
    }),
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield types_d_users_1.usersofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findByIdAndDelete(id);
    }),
    addFriend: (name1, name2) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findOneAndUpdate({ username: name1 }, { $addToSet: { amigos: name2 } });
    }),
    delFriend: (name1, name2) => __awaiter(void 0, void 0, void 0, function* () {
        return yield types_d_users_1.usersofDB.findOneAndUpdate({ username: name1 }, { $pull: { amigos: name2 } });
    })
};
