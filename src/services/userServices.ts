import { usersInterface, usersfromDBInterface, usersofDB } from '../modelos/types_d_users'
//import userData from './users.json'

export const getEntries = {
    getAll: async (num1: number, num2: number): Promise<usersInterface[]> => {
        const rnum = num1 * num2;
        return await usersofDB.aggregate([
            { $skip: rnum },
            { $limit: num2 }
        ]);
    },
    findById: async (id: string): Promise<usersInterface | null> => {
        return await usersofDB.findById(id);
    },
    findIdAndPassword: async (username: string, password: string): Promise<usersInterface | null> => {
        // Si falla quitar el name:name por name, pero no deberia.
        return await usersofDB.findOne({ username: username }).exec()
            .then(userResponse => {
                if (userResponse == null || userResponse.password != password) {
                    return null;
                } else {
                    return userResponse;
                }
            });
    },
    findIdByName: async (name: string): Promise<string | null> => {
        return await usersofDB.findOne({ name: name }).exec()
            .then(userResponse => {
                if (userResponse == null) {
                    return null;
                } else {
                    return userResponse._id.toString();
                }
            })
            .catch(error => {
                console.error('Error al buscar el usuario por nombre:', error);
                return null;
            });
    },
    findByUsername: async (username: string): Promise<usersfromDBInterface | null> => {
        console.log(username);
        return await usersofDB.findOne({ username: username });
    },
    create: async (entry: usersInterface): Promise<usersInterface> => {
        return await usersofDB.create(entry);
    },
    update: async (id: string, body: object): Promise<usersInterface | null> => {
        console.log(body);
        return await usersofDB.findByIdAndUpdate(id, body, { $new: true });
    },
    delete: async (id: string): Promise<usersInterface | null> => {
        return await usersofDB.findByIdAndDelete(id);
    },
    addFriend: async (name1: string, name2: string) => {
        await usersofDB.findOneAndUpdate({ username: name2 }, { $addToSet: { amigos: name1 } });
        return await usersofDB.findOneAndUpdate({ username: name1 }, { $addToSet: { amigos: name2 } });
    },
    delFriend: async (name1: string, name2: string) => {
        await usersofDB.findOneAndUpdate({ username: name2 }, { $pull: { amigos: name1 } });
        return await usersofDB.findOneAndUpdate({ username: name1 }, { $pull: { amigos: name2 } });
    },
    addSolicitud: async (name1: string, name2: string) => {
        return await usersofDB.findOneAndUpdate({ username: name1 }, { $addToSet: { solicitudes: name2 } }, { new: true });
    },
    delSolicitud: async (name1: string, name2: string) => {
        return await usersofDB.findOneAndUpdate({ username: name1 }, { $pull: { solicitudes: name2 } });
    },
    findUserExperiences: async (id: string) => {
        return await usersofDB.findById(id).populate('experiences').exec();
    },
}