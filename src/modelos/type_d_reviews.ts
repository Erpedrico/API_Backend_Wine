import { model, Schema, Types } from "mongoose";

export interface reviewsInterface {
    owner: Types.ObjectId; // Reference to the User
    rating: number; // Rating from 0 to 5 in steps of 0.5
    comment: string; // Review comment
}

export const reviewsSchema = new Schema<reviewsInterface>({
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to the User model
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    comment: { type: String, required: true }, // Text of the review
});

export const reviewsofDB = model<reviewsInterface>('reviews', reviewsSchema);
