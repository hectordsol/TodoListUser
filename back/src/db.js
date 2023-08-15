import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://admin:admin@admin.qqwykfb.mongodb.net/todolist");
        console.log(">>>DB Connected");
    }
    catch (error){
        console.log(error);
    }
}
