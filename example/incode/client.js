import dotenv from 'dotenv';
dotenv.config();

export const clientTenant = {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    API_VERSION: process.env.API_VERSION,
    CLIENT_ID: process.env.CLIENT_ID,
    FLOW_ID: process.env.FLOW_ID
}