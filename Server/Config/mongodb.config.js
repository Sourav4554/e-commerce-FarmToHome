import mongoose from "mongoose";

const connectDatabase=async()=>{
try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log('mongodb connected')
} catch (error) {
    console.log(error.message)
}

}

export {connectDatabase}