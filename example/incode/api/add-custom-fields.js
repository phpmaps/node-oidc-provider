
import { doPost } from '../helpers/http-post.js';
import dotenv from 'dotenv';

dotenv.config();

export const addCustomField = async (client, fields, header) => {
    const endpoint = "omni/add/custom-fields";
    const url = `${client.API_URL}/${endpoint}`;

    try {
        console.log(url);
        console.log(header);
        console.log(fields);
        const resp = await doPost(url, header, fields);
        return resp.body;

    } catch (error) {
        throw Error(`error using ${endpoint}`);
    }
};