import mongoose from 'mongoose';
export default async () => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(process.env.MONGODB_URI)
}