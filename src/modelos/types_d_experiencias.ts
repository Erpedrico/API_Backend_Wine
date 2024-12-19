import { model, Schema, Types } from "mongoose";
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
    rating:  number // Array of rating objects
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
    rating: { type: Number },
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
    date: { type: String, required: true },
    services: [
        {
            icon: { type: String, required: true },
            label: { type: String, required: true },
        },
    ],
  });

export const experienciasofDB = model<experienciasInterface>('experiencias', experienciasSchema);

