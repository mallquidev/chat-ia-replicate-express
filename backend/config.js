import dotenv from 'dotenv'

dotenv.config()
export const PORT = process.env.PORT || 3000;
export const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;