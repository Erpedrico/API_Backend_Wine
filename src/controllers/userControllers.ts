//import { pageInterface } from '../modelos/type_d_extras'
import { usersInterface, UsersInterfacePrivateInfo } from '../modelos/types_d_users'
import * as userServices from '../services/userServices'
import { Request, Response } from 'express'
import { getEntries } from '../services/userServices'


// Controlador sin el parámetro req
export async function findAllUsersNoPagination(_req: Request, res: Response): Promise<Response> {
    try {
        const users: usersInterface[] = await userServices.getEntries.getAllWithoutPagination();
        return res.json(users);
    } catch (e) {
        return res.status(500).json({ e: 'Failed to find all users' });
    }
}


export async function findPaginatedUsers(req: Request, res: Response): Promise<Response> {
    try {
        const { paginas, numerodecaracterespp } = req.body as { paginas: number, numerodecaracterespp: number };
        const users = await getEntries.getPaginated(paginas, numerodecaracterespp);
        return res.json(users);
    } catch (e) {
        return res.status(500).json({ error: 'Failed to retrieve paginated users' });
    }
}

export async function findUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.findById(req.params.id)
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function logIn(req:Request,res:Response):Promise<Response> {
    try{
        const { name,password } = req.body as UsersInterfacePrivateInfo;
        const user:usersInterface|null = await userServices.getEntries.findIdAndPassword(name, password);
        if (user!=null){
            return res.json(user);
        } else {
            return res.status(400).json({message:'User or password incorrect'})
        }
    } catch(e){
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function createUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.create(req.body as object)
        return res.status(200).json(user)
    } catch(e){
        return res.status(500).json({ e: 'Failed to create user' });
    }
}

export async function updateUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.update(req.params.id,req.body as object)
        return res.status(200).json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to update user' });
    }
}

export async function deleteUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.delete(req.params.id)
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to delete user' });
    }
}