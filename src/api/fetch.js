/**
 * Fetch is an easier to use wrapper for the fetch api.
 * It is able to add custom headers and handle some custom errors.
 *
 * Lars Bärtschi, 27.11.2018
 */

const requestHeaders = () => ({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
});

/**
 * Do a request
 * @param url the provided url to make a request to
 * @param method (for example GET, POST, PUT, DELETE)
 * @param payload only if the requested method has a body (POST/PUT/PATCH)
 * @returns {Promise<*>}, data if completed
 */
export default async (url, method, payload) => {
    const options = {
        method,
        headers: requestHeaders(),
        body: method !== 'GET' ? payload : undefined
    };

    const response = await fetch(url, options);
    if (response.status === 204) {
        return {};
    }

    const body = await response.json();

    if (response.status >= 300) {
        const error = new Error(body.message);
        error.response = body;
        error.status = response.status;
        throw error;
    }

    return body;
};
