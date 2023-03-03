import dotenv from 'dotenv';
import { doGet } from '../helpers/http-get.js';

dotenv.config();

export const getOnboardingUrl = async (header) => {
    const endpoint = `omni/onboarding-url?clientId=${process.env.CLIENT_ID}`;
    const url = `https://demo-api.incodesmile.com/0/${endpoint}`;

    try {
        return doGet(url, header);
    } catch (error) {
        throw Error(`error using ${endpoint}`);
    }
};
