import dotenv from 'dotenv';

dotenv.config();
const API_URL = process.env.VUE_APP_API_URL;
export default API_URL;
