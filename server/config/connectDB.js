import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING as MONGO_URI } from './dotenv.js';

const connectDB = async () => {
    try {
        const mongoResponse = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MONGO_DB to Cluster ${mongoResponse.connection.host}`)
        
    } catch (error) {
        console.log(error)
    }   

}

export default connectDB 
