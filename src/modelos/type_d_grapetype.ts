import mongoose, { Schema, Document } from 'mongoose';

export interface GrapeTypeInterface extends Document {
    name: string;
    color: 'RED' | 'WHITE';
}

const GrapeTypeSchema = new Schema<GrapeTypeInterface>({
    name: { type: String, required: true },
    color: { type: String, enum: ['RED', 'WHITE'], required: true },
});

export default mongoose.model<GrapeTypeInterface>('GrapeType', GrapeTypeSchema);
