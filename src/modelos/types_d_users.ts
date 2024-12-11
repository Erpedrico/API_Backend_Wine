import { model, Schema } from "mongoose";

export interface usersInterface {
    _id?: string,
    username: string,
    name: string,
    mail: string,
    password: string,
    comment: string,
    tipo: 'admin' | 'wineLover' | 'wineMaker',
    habilitado: boolean,
    amigos: string[],
    solicitudes: string[],
    experiences: string[],
}
export type UsersInterfacePublicInfo = Pick<usersInterface, 'name' | 'comment'>
export type UsersInterfacePrivateInfo = Pick<usersInterface, 'username' | 'password'>
export type newUserInfo = Omit<usersInterface, 'id'>
export interface usersfromDBInterface extends usersInterface {
    _id: string
}

export const usersSchema = new Schema<usersInterface>({
    _id: { type: String, required: true, unique: true, default: '' },
    username: { type: String, required: true, unique: true, default: '' },
    name: { type: String, required: true, default: '' },
    mail: { type: String, required: true, default: '' },
    password: { type: String, required: true, default: '' },
    tipo: { type: String, required: true, enum: ['admin', 'wineLover', 'wineMaker'], default: 'wineLover' },
    habilitado: { type: Boolean, required: true, default: true },
    amigos: [{ type: String, required: true, default: [] }],
    solicitudes: [{ type: String, required: true, default: [] }],
    experiences: [{ type: Schema.Types.ObjectId, ref: 'experiencias', default: [] }], // Relación con experiencias
})

export const usersofDB = model<usersInterface>('user', usersSchema)