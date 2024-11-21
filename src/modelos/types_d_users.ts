import mongoose, { Schema, model } from 'mongoose';

export interface usersInterface{
    _id?: mongoose.Types.ObjectId;
    name: string,
    mail: string,
    password: string,
    comment: string,
    habilitado: boolean,
    role: string
}
export type UsersInterfacePublicInfo = Pick<usersInterface,  'name' | 'comment'>
export type UsersInterfacePrivateInfo = Pick<usersInterface, 'name' | 'password'>
export type newUserInfo = Omit<usersInterface,'id'>

export const usersSchema = new Schema<usersInterface>({
    name: String,
    mail: String,
    password: String,
    comment: String,
    habilitado: Boolean,
    role: String
})

export const usersofDB = model<usersInterface>('user',usersSchema)
