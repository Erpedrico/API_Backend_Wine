import { wineInterface, wineofDB } from '../modelos/types_d_wine'
//import userData from './users.json'

export const getEntries = {
    getAll: async(): Promise<wineInterface[]>=>{
        return await wineofDB.find();
    },
    findById: async(id:string): Promise<wineInterface | null>=>{
        return await wineofDB.findById(id);
    },
    create: async (entry: object) => {
            try {
                console.log("ESTE ES EL ENTRY", entry);  // Mejor visualización del objeto con coma
                const newWine = await wineofDB.create(entry);
                return newWine;  // Devuelves la instancia recién creada si es exitosa
            } catch (error) {
                console.error("Error creating the wine:", error);  // Captura cualquier error
                throw new Error('Error al crear el vino');  // Lanza un error para manejarlo en el controlador
            }
        },
    update: async(id:string,body:object): Promise<wineInterface | null>=>{
        return await wineofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    findByOwnerandUpdate: async(id:string,body:object): Promise<wineInterface | null>=>{
        return await wineofDB.findOneAndUpdate({owner:id},body).exec();
    },
    delete: async(id:string): Promise<wineInterface | null>=>{
        return await wineofDB.findByIdAndDelete(id);
    },
    findByOwnerandDelete: async(id:string): Promise<wineInterface | null>=>{
        return await wineofDB.findOneAndDelete({owner:id}).exec();
    }
}