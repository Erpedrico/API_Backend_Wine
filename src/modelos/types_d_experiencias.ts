import { model, Schema } from "mongoose";

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

export const experienciasofDB = model<experienciasInterface>('experiencias',experienciasSchema)