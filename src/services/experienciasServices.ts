import { experienciasInterface, experienciasofDB } from "../modelos/types_d_experiencias";

// Función para buscar si el usuario ya tiene un rating en una experiencia
export const findRatingByUser = async (experienceId: string, userId: string) => {
    const experience = await experienciasofDB.findById(experienceId);
    if (!experience) {
        return null;
    }

    // Buscar si el rating del usuario existe en la experiencia
    const existingRating = experience.ratings.find(rating => rating.user._id.toString() === userId);
    return existingRating ? existingRating : null;
};

export const getEntries = {
    getAll: async () => {
        return await experienciasofDB.find();
    },
    findById: async (id: string) => {
        return await experienciasofDB.findById(id);
    },
    findUserById: async (id: string) => {
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

    delParticipant: async (idExp: string, idPart: string) => {
        return await experienciasofDB.findByIdAndUpdate(idExp, { $pull: { participants: idPart } });
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

    update: async (id: string, body: object) => {
        console.log(body);
        return await experienciasofDB.findByIdAndUpdate(id, body, { $new: true });
    },
    findByOwnerandUpdate: async (id: string, body: object): Promise<experienciasInterface | null> => {
        return await experienciasofDB.findOneAndUpdate({ owner: id }, body).exec();
    },
    delete: async (id: string) => {
        return await experienciasofDB.findByIdAndDelete(id);
    },
    findByOwnerandDelete: async (id: string): Promise<experienciasInterface | null> => {
        return await experienciasofDB.findOneAndDelete({ owner: id }).exec();
    },
    addRating: async (experienceId: string, user: any, ratingValue: number, comment: string): Promise<experienciasInterface | null> => {
        try {
            // Verificar si el usuario ya ha valorado la experiencia
            const existingRating = await findRatingByUser(experienceId, user._id);
            if (existingRating) {
                return null;
            }

            // Buscar la experiencia
            const experience = await experienciasofDB.findById(experienceId);
            if (!experience) {
                return null;
            }

            // Añadir la nueva valoración
            experience.ratings.push({ user: user._id, value: ratingValue, comment });

            // Recalcular el promedio
            const totalRatings = experience.ratings.length;
            const sumRatings = experience.ratings.reduce((acc, rating) => acc + rating.value, 0);
            const averageRating = sumRatings / totalRatings;
            experience.averageRating = averageRating;

            // Guardar la experiencia actualizada
            await experience.save();

            return experience;
        } catch (error) {
            console.error("Error adding rating in service:", error);
            throw new Error("Failed to add rating");
        }
    },

    // Función para obtener las valoraciones (ratings) de una experiencia
    getRatingsByExperience: async (experienceId: string) => {
        try {
            console.log(experienceId)
            // Buscar la experiencia por ID
            const experience = await experienciasofDB.findById(experienceId);
            console.log(experience)
            if (!experience) {
                return null; // Si no se encuentra la experiencia, retornamos null
            }
            // Retornar las valoraciones asociadas a la experiencia
            console.log(experience.ratings)
            return experience.ratings;
        } catch (error) {
            console.error("Error fetching ratings:", error);
            throw new Error("Error fetching ratings");
        }
    },

    findByOwner: async (ownerId: string) => {
        return await experienciasofDB.find({ owner: ownerId });
    },

    addWine: async (experienceId: string, wineId: string): Promise<experienciasInterface | null> => {
        try {
            return await experienciasofDB.findByIdAndUpdate(
                experienceId,
                { $addToSet: { wines: wineId } }, // Evita duplicados
                { new: true } // Devuelve la experiencia actualizada
            );
        } catch (error) {
            console.error('Error in addWine service:', error);
            throw error;
        }
    },

}