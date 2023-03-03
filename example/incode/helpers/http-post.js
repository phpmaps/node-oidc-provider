import fetch from 'node-fetch';

export const doPost = async (url, headers, params) => {
    let response;
    let json;
    let p;
    if (params) {
        p = new URLSearchParams(params);
    }
    try {
        response = await fetch(url, {method: 'POST', body: JSON.stringify(params), headers: headers})
        json = await response.json()
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
        console.log(`Attention:  HTTPPOST error.`);
        console.log(payload);
        return payload;
    }
}