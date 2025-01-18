import { wineInterface, wineofDB } from '../modelos/types_d_wine'
//import userData from './users.json'

export const getEntries = {
    getAll: async (): Promise<wineInterface[]> => {
        return await wineofDB.find();
    },
    findById: async (id: string): Promise<wineInterface | null> => {
        return await wineofDB.findById(id);
    },
    create: async (entry: wineInterface) => {
        try {
            console.log("Creating wine:", entry);
            const newWine = await wineofDB.create(entry);
            return newWine;
        } catch (error) {
            console.error("Error creating the wine:", error);
            throw new Error('Error al crear el vino');
        }
    },
    update: async (id: string, body: object): Promise<wineInterface | null> => {
        return await wineofDB.findByIdAndUpdate(id, body, { $new: true });
    },
    findByOwnerandUpdate: async (id: string, body: object): Promise<wineInterface | null> => {
        return await wineofDB.findOneAndUpdate({ owner: id }, body).exec();
    },
    delete: async (id: string): Promise<wineInterface | null> => {
        return await wineofDB.findByIdAndDelete(id);
    },
    findByOwnerandDelete: async (id: string): Promise<wineInterface | null> => {
        return await wineofDB.findOneAndDelete({ owner: id }).exec();
    },
    getByOwner: async (ownerId: string): Promise<wineInterface[]> => {
        return await wineofDB.find({ owner: ownerId }).exec(); // Removemos el populate
    },
}