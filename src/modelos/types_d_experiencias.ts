/*import { model, Schema, Types } from "mongoose";
import { Service } from "./type_d_services";

export interface experienciasInterface {
    title: string;
    owner: Types.ObjectId; // Creator's ID
    participants: Types.ObjectId[]; // Array of user IDs
    description: string;
    price: number;
    location: string;
    contactnumber: number;
    contactmail: string;
    rating: { user: Types.ObjectId; value: number }[]; // Array of rating objects
    reviews: Types.ObjectId[]; // Array of review references
    date: string;
    services: Service[]; // Array of services
}

const experienciasSchema = new Schema<experienciasInterface>({
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    contactmail: { type: String, required: true },
    rating: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        value: { type: Number, required: true, min: 0, max: 5 },
      },
    ],
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
    date: { type: String, required: true },
    services: [
        {
            icon: { type: String, required: true },
            label: { type: String, required: true },
        },
    ],
  });

// Virtual para calcular la media del rating
experienciasSchema.virtual('averageRating').get(function () {
    if (this.rating.length === 0) return 0;
    const sum = this.rating.reduce((acc, curr) => acc + curr.value, 0);
    return sum / this.rating.length;
  });

export const experienciasofDB = model<experienciasInterface>('experiencias', experienciasSchema);*/

import { model, Schema, Types } from "mongoose";
import { Service } from "./type_d_services";

export interface experienciasInterface {
    title: string;
    owner: Types.ObjectId; 
    participants: Types.ObjectId[]; 
    description: string;
    price: number;
    location: string;
    contactnumber: number;
    contactmail: string;
    rating: { user: Types.ObjectId, value: number }[];
    averageRating: number;
    reviews: Types.ObjectId[];
    date: string;
    services: Service[];
}

const experienciasSchema = new Schema<experienciasInterface>({
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    contactmail: { type: String, required: true },
    rating: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
            value: { type: Number, required: true, min: 0, max: 5 },
        },
    ],
    averageRating: { type: Number, default: 0 }, // Añadir campo para la calificación promedio
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
    date: { type: String, required: true },
    services: [
        {
            icon: { type: String, required: true },
            label: { type: String, required: true },
        },
    ],
});

experienciasSchema.methods.calculateAverageRating = function () {
    if (this.rating.length === 0) return 0; // Si no hay calificaciones, retorna 0

    // Usa `reduce` para sumar todas las calificaciones y luego divide por el número de calificaciones
    const sum = this.rating.reduce((accumulator: number, currentRating: { value: number }) => {
        return accumulator + currentRating.value;
    }, 0);

    // Calcula la calificación promedio
    this.averageRating = sum / this.rating.length;

    return this.averageRating; // Retorna la calificación promedio
};


export const experienciasofDB = model<experienciasInterface>('experiencias', experienciasSchema);


