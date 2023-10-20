import mongoose from "mongoose";


const connectToDB=async()=>{
    
    try {
        if (mongoose.connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error(error.message)
    }
}

export default connectToDB;