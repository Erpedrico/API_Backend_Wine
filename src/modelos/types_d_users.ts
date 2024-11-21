import { model, Schema } from "mongoose";

export interface usersInterface{
    username: string,
    name: string,
    mail: string,
    password: string,
    comment: string,
    tipo: string,
    habilitado: boolean;
}
export type UsersInterfacePublicInfo = Pick<usersInterface,  'name' | 'comment'>
export type UsersInterfacePrivateInfo = Pick<usersInterface, 'name' | 'password'>
export type newUserInfo = Omit<usersInterface,'id'>

export const usersSchema = new Schema<usersInterface>({
    username: String,
    name: String,
    mail: String,
    password: String,
    comment: String,
    tipo: String,
    habilitado: Boolean
})

export const usersofDB = model<usersInterface>('user',usersSchema)