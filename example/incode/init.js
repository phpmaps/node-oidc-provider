import dotenv from 'dotenv';
import { Auth } from './helpers/auth.js';

dotenv.config();

export const initSession = async (client, invokedFrom, uuid, interviewId) => {
    const auth = new Auth(client, invokedFrom, uuid, interviewId);
    return auth.getSessionAccess();
}

