import { Headers as HttpHeader } from 'node-fetch';
import { doPost } from '../helpers/http-post.js';
import dotenv from 'dotenv';

dotenv.config();

export const start = async (client, interviewId) => {
    const endpoint = "omni/start";

    //Tweak Incode's URL removing the /0 specifically for the executive login endpoint
    let url = `${client.API_URL.substring(0, client.API_URL.length - 2)}/${endpoint}`;

    const params = {
        configurationId: client.FLOW_ID,
        interviewId: interviewId,
        countryCode: "ALL",
        language: "en-US"
    }

    if (!interviewId) {
        delete params.interviewId;
    } else {
        delete params.configurationId;
    }

    const header = new HttpHeader();
    header.append('Content-Type', "application/json");
    header.append('x-api-key', client.API_KEY);
    header.append('api-version', '1.0');

    try {
        const resp = await doPost(url, header, params);
        return resp.body;

    } catch (error) {
        throw Error(`error using ${endpoint}`);
    }
};