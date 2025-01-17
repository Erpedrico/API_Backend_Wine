import { model, Schema, Types } from "mongoose";

export interface wineInterface {
    owner: string,
    name: string,
    price: number,
    color: string,
    brand: string,
    grapetype: string,
    habilitado: boolean,
    experience: Types.ObjectId
}

export const wineSchema = new Schema<wineInterface>({
    owner: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    grapetype: { type: String, required: true },
    habilitado: { type: Boolean, required: true },
    experience: { type: Schema.Types.ObjectId, ref: 'Experiencias', required: true },
})

export const wineofDB = model<wineInterface>('wine', wineSchema)