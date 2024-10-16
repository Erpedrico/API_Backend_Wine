import { usersInterface, usersofDB } from '../modelos/types_d_users'

export const getEntries = {
    getPaginated: async (num1: number, num2: number): Promise<usersInterface[]> => {
        const rnum = num1 * num2;
        return await usersofDB.aggregate([
            { $skip: rnum },
            { $limit: num2 }
        ]);
    },
    
    getAllWithoutPagination: async (): Promise<usersInterface[]> => {
        const users = await usersofDB.find();
        console.log(users);  // Agrega este log para ver si se están obteniendo usuarios.
        return users;
    },

    findById: async(id: string): Promise<usersInterface | null> => {
        return await usersofDB.findById(id);
    },

    findIdAndPassword: async(name: string, password: string): Promise<usersInterface | null> => {
        return await usersofDB.findOne({ name: name }).exec()
        .then(userResponse => {
            if (userResponse == null || userResponse.password != password) {
                return null;
            } else {
                return userResponse;
            }
        });
    },

    create: async(entry: object): Promise<usersInterface> => {
        return await usersofDB.create(entry);
    },

    update: async(id: string, body: object): Promise<usersInterface | null> => {
        console.log(body);
        return await usersofDB.findByIdAndUpdate(id, body, { $new: true });
    },

    delete: async(id: string): Promise<usersInterface | null> => {
        return await usersofDB.findByIdAndDelete(id);
    }
}







/*import { usersInterface, usersofDB } from '../modelos/types_d_users'
//import userData from './users.json'

export const getEntries = {
    getAll: async(num1:number,num2:number): Promise<usersInterface[]>=>{
        const rnum=num1*num2;
        return await usersofDB.aggregate([
            {$skip:rnum},
            {$limit:num2}
        ]);
    },
    findById: async(id:string): Promise<usersInterface | null>=>{
        return await usersofDB.findById(id);
    },
    findIdAndPassword: async(name:string,password:string): Promise<usersInterface | null>=>{
        // Si falla quitar el name:name por name, pero no deberia.
        return await usersofDB.findOne({name:name}).exec()
        .then(userResponse=>{
            if (userResponse == null || userResponse.password != password){
                return null;
            } else {
                return userResponse;
            }
        });
    },
    create: async(entry:object): Promise<usersInterface>=>{
        return await usersofDB.create(entry);
    },
    update: async(id:string,body:object): Promise<usersInterface | null>=>{
        console.log(body);
        return await usersofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    delete: async(id:string): Promise<usersInterface | null>=>{
        return await usersofDB.findByIdAndDelete(id);
    }
}*/