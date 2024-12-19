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
    ratings: {  // Array to store individual ratings (from users)
        user: Types.ObjectId;  // ID of the user who rated
        value: number;          // Rating value (0-5)
    }[]; 
    reviews: Types.ObjectId[]; // Array of review references
    date: string;
    services: Service[]; // Array of services
    averageRating: number;  // Average rating (optional)
}
// const generateRandomRating = () => { return Math.round((Math.random() * 5) * 10) / 10; };

export const experienciasSchema = new Schema<experienciasInterface>({
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    contactmail: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
    date: { type: String, required: true },
    services: [
        {
            icon: { type: String, required: true },
            label: { type: String, required: true },
        },
    ],
    ratings: [  // This stores individual ratings
        {
            user: { type: Schema.Types.ObjectId, ref: "user", required: true },
            value: { type: Number, min: 0, max: 5, required: true },  // Value between 0-5
        },
    ],
    averageRating: { type: Number, default: 0, required: true }, // Optional: Field for average rating
});

export const experienciasofDB = model<experienciasInterface>('experiencias', experienciasSchema);
