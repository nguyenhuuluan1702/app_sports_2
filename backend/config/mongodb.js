import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {


    await mongoose.connect(`${process.env.MONGODB_URI}/db-TraSua`)

    mongoose.connection.on('connected', ()=>{
        console.log("DB connected");
    })

}

export default connectDB;