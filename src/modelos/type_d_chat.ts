import { model, Schema } from "mongoose";

export interface chatInterface extends Document {
    user: string;
    message: string;
    date: Date;
}

const chatSchema: Schema = new Schema({
    users: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export const usersofDB = model<chatInterface>('chat', chatSchema)