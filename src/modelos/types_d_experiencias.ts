import { model, Schema, Types } from "mongoose";

export interface experienciasInterface {
    title: string;
    owner: Types.ObjectId; // Creator's ID
    participants: Types.ObjectId[]; // Array of user IDs
    description: string;
    price: number;
    location: string;
    contactnumber: number;
    contactmail: string;
    rating: number;
    reviews: Types.ObjectId[]; // Array of review references
    date: string;
}

export const experienciasSchema = new Schema<experienciasInterface>({
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    contactmail: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

export const experienciasofDB = model<experienciasInterface>('experiencias', experienciasSchema);
