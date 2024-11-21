import { usersInterface,usersfromDBInterface,usersofDB } from '../modelos/types_d_users'
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
    findIdAndPassword: async(username:string,password:string): Promise<usersInterface | null>=>{
        // Si falla quitar el name:name por name, pero no deberia.
        return await usersofDB.findOne({username:username}).exec()
        .then(userResponse=>{
            if (userResponse == null || userResponse.password != password){
                return null;
            } else {
                return userResponse;
            }
        });
    },
    findByUsername: async(username:string) : Promise<usersfromDBInterface | null>=> {
        console.log(username);
        return await usersofDB.findOne({username: username});
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
}