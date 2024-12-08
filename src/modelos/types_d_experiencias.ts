/*import { model, Schema } from "mongoose";

export interface experienciasInterface{
    title: string,
    owner: string,
    participants: string[],
    description: string,
    price: number,
    location: string,
    contactnumber: number,
    contactmail: string,

}

export const experienciasSchema = new Schema<experienciasInterface>({
    title: String,
    owner: String,
    participants: [String],
    description: String,
    price: Number,
    location: String,
    contactnumber: Number,
    contactmail: String,
})

export const experienciasofDB = model<experienciasInterface>('experiencias',experienciasSchema)*/

import { model, Schema } from "mongoose";

// Interfaz que representa la experiencia
export interface experienciasInterface {
  title: string;
  owner: string;
  participants: string[];
  description: string;
  price: number;
  location: string; // Ubicación en texto
  latitude: number; // Coordenada de latitud
  longitude: number; // Coordenada de longitud
  contactnumber: number;
  contactmail: string;
}

// Esquema de Mongoose
export const experienciasSchema = new Schema<experienciasInterface>({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  participants: { type: [String], default: [] },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true }, // Ubicación en texto
  latitude: { type: Number, required: true }, // Latitud obligatoria
  longitude: { type: Number, required: true }, // Longitud obligatoria
  contactnumber: { type: Number, required: true },
  contactmail: { type: String, required: true },
});

// Modelo exportado
export const experienciasofDB = model<experienciasInterface>(
  "experiencias",
  experienciasSchema
);
