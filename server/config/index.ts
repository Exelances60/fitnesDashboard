import "dotenv/config";
export const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vs0ffby.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT || 3000;
export const databaseType = process.env.DATABASE_TYPE;
