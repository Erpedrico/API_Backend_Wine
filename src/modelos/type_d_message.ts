import { model, Schema } from "mongoose";

export interface messageInterface  extends Document {
    room: string;
    content: string;
    timestamp: Date;
}

const messageSchema = new Schema({
    room: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
  
export const messagesofDB = model<messageInterface>('message',messageSchema)