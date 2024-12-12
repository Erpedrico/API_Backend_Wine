//import { model, Schema } from "mongoose";

const mongoose = require ('mongoose')
//import mongoose from 'mongoose'

const connectionString = 'mongodb://mongo:27017/winer-db'

mongoose.connect(connectionString)
    .then(()=>{
        console.log('Database connected!!')
    }) .catch((err)=>{
        console.error(err)
    });

const usersSchema = new mongoose.Schema({
    id: Number,
    name: String,
    mail: String,
    password: String,
    comment: String
})

const users = mongoose.model('user',usersSchema)

/*const user1 = new users({
    id: 6,
    name: 'Gerard',
    mail: 'Derivia',
    password: 'Ignis',
    comment: 'No le caen bien los caballeros'
})
user1.save().then((result)=>{
    console.log(result)
    }) .catch((err)=>{
    console.error(err)
    });*/

users.find({}).then((result)=> {
    console.log(result)
    mongoose.connection.close()
})
