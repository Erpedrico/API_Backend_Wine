import { model, Schema } from "mongoose";

export interface wineInterface{
    owner: string,
    name: string,
    price: number,
    color: string,
    brand: string,
    grapetype: string,
    habilitado: boolean
}

export const wineSchema = new Schema<wineInterface>({
    owner: String,
    name: String,
    price: Number,
    color: String,
    brand: String,
    grapetype: String,
    habilitado: Boolean
})

export const wineofDB = model<wineInterface>('wine',wineSchema)