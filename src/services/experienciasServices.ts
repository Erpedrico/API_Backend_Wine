import { experienciasInterface, experienciasofDB } from "../modelos/types_d_experiencias";

export const getEntries = {
    getAll: async()=>{
    return await experienciasofDB.find();
    },
    findById: async(id:string)=>{
        return await experienciasofDB.findById(id);
    },
    findUserById: async(id:string)=>{
        return await experienciasofDB.findById(id);
    },
    addParticipant: async (idExp: string, idPart: string) => {
        try {
            // Usa $addToSet para evitar duplicados
            const updatedExperience = await experienciasofDB.findByIdAndUpdate(
                idExp,
                { $addToSet: { participants: idPart } },
                { new: true } // Devuelve el documento actualizado
            );
    
            return updatedExperience;
        } catch (error) {
            console.error('Error in addParticipant service:', error); // Log para depuración
            throw error;
        }
    },
    
    delParticipant: async(idExp:string,idPart:string)=>{
        return await experienciasofDB.findByIdAndUpdate(idExp,{$pull:{participants:idPart}});
    },
    create: async (entry: object) => {
        try {
            console.log("ESTE ES EL ENTRY", entry);  // Mejor visualización del objeto con coma
            const newExperiencia = await experienciasofDB.create(entry);
            return newExperiencia;  // Devuelves la instancia recién creada si es exitosa
        } catch (error) {
            console.error("Error creating experience:", error);  // Captura cualquier error
            throw new Error('Error al crear la experiencia');  // Lanza un error para manejarlo en el controlador
        }
    },
    
    update: async(id:string,body:object)=>{
        console.log(body);
        return await experienciasofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    findByOwnerandUpdate: async(id:string,body:object): Promise<experienciasInterface | null>=>{
        return await experienciasofDB.findOneAndUpdate({owner:id},body).exec();
    },
    delete: async(id:string)=>{
        return await experienciasofDB.findByIdAndDelete(id);
    },
    findByOwnerandDelete: async(id:string): Promise<experienciasInterface | null>=>{
        return await experienciasofDB.findOneAndDelete({owner:id}).exec();
    }
}