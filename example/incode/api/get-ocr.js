import dotenv from 'dotenv';
import { doGet } from '../helpers/http-get.js';

dotenv.config();

export const getOcr = async (client, interviewId, header) => {

    const endpoint = `omni/get/ocr-data?id=${interviewId}`;
    const url = `${client.API_URL}/${endpoint}`;

    try {
        return doGet(url, header);
    } catch (error) {
        throw Error(`error using ${endpoint}`);
    }

    
};
