import { Headers as HttpHeader } from 'node-fetch';
import { start } from '../api/start.js';
import { addCustomField } from '../api/add-custom-fields.js';

export class Auth {
    auth;
    header;
    client;
    externalId;
    interviewId;

    constructor(client, invokedFrom, uid, interviewId) {
        this.client = client;
        this.invokedFrom = invokedFrom;
        this.uid = uid;
        this.interviewId = interviewId;
    }

    async getSessionAccess() {
        this.auth = await start(this.client, this.interviewId);

        const header = new HttpHeader();
        header.append('Content-Type', "application/json");
        header.append('x-incode-hardware-id', this.auth.token);
        header.append('api-version', this.client.API_VERSION);

        if (this.invokedFrom === 'init') {
            const fields = {
                customFields: {
                    init: this.uid
                }
            };
            const customFields = await addCustomField(this.client, fields, header);
            console.log(customFields);
        }

        if (this.invokedFrom === 'login') {
            const fields = {
                customFields: {
                    login: this.uid
                }
            };
            const customFields = await addCustomField(fields, header);
            console.log(customFields);
        }

        return {
            header: header,
            auth: this.auth,
            client: this.client
        };
    }

    static createHeader(token) {
        const header = new HttpHeader();
        header.append('Content-Type', "application/json");
        header.append('x-incode-hardware-id', token);
        header.append('api-version', "1.0");
        return header;
    }
};
