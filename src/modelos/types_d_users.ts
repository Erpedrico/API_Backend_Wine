import { model, Schema, Types } from "mongoose";

export interface usersInterface {
    username: string,
    name: string,
    mail: string,
    password: string,
    comment: string,
    tipo: 'admin' | 'wineLover' | 'wineMaker',
    habilitado: boolean,
    experiences: Types.ObjectId[],
}
export type UsersInterfacePublicInfo = Pick<usersInterface, 'name' | 'comment'>
export type UsersInterfacePrivateInfo = Pick<usersInterface, 'username' | 'password'>
export type newUserInfo = Omit<usersInterface, 'id'>
export interface usersfromDBInterface extends usersInterface {
    _id: string
}

export const usersSchema = new Schema<usersInterface>({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['admin', 'wineLover', 'wineMaker'] },
    habilitado: { type: Boolean, required: true, default: true },
    experiences: [{ type: Schema.Types.ObjectId, ref: "experiencias" }],
})

export const usersofDB = model<usersInterface>('user', usersSchema)