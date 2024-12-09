import { model, Schema } from "mongoose";

export interface roomInterface  extends Document {
    name: string;
    createdAt: Date;
}

const roomSchema = new Schema({
  name: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});
  
export const roomsofDB = model<roomInterface>('room',roomSchema)

