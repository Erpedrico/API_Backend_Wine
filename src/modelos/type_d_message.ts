import { model, Schema } from "mongoose";

export interface messageInterface extends Document {
    room: string;
    username: string;
    content: string;
    timestamp: Date;
}

const messageSchema = new Schema({
    room: { type: String, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const messagesofDB = model<messageInterface>('message', messageSchema)