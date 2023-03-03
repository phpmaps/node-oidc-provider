import fetch from 'node-fetch';

export const doGet = async (url, headers, params) => {
    let response;
    let json;
    if (params) {
        const p = new URLSearchParams(params);
        url = `${url}?${p.toString()}`
    }
    try {
        response = await fetch(url, { headers: headers });
        json = await response.json();

        return {
            status: response.status,
            headers: response.headers,
            error: null,
            body: json,
            index: url
        }
    } catch (e) {
        const payload = {};
        payload.status = response ? response.status : null;
        payload.headers = response ? response.headers : null;
        payload.error = e;
        payload.body = json;
        payload.index = url;
        console.log(`Attention:  HTTPGET error.`);
        console.log(payload);
        return payload;
    }
}