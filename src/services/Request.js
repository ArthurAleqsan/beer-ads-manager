export default class ServerConnector {
    constructor(path, api = '/video') {
        this.path = api + path;
    }

    isOkStatus(status) {
        return [200, 201, 204].includes(status);
    }

    static makeQuery(obj) {
        let query = '';
        Object.keys(obj).forEach((key, i) => {
            query += `&${key}=${obj[key]}`
        });
        return query.substr(1);
    }

    static _handleErrors(res) {
        if (res.status !== 401) return res;
        //logout
    }

    send(req, isFomData, errHandler) {
        const path = `${this.path}${req.path}`;
        return ServerConnector._makeRequest(req, path, errHandler, isFomData).then((res) => {
            return res;
        })
    }
    static makeFormData(data, isObj) {
        const form = new FormData();
        if (isObj) {
            for (var key in data) {
                form.append(key, data[key]);
            }
        } else {
            form.append('file', data);
        }
        console.log(form)
        return form;
    }

    static _makeRequest(req, path, errHandler, isFormData) {
        return ServerConnector.fetcher(req, path, errHandler, isFormData)
            .then((res) => ServerConnector._handleErrors(res))
            .then((res) => {
                return res.json().then(json => {
                    return {
                        status: res.status,
                        json
                    };
                });
            })
            .catch(error => {
                if (errHandler) { }
                return {
                    status: error.message,
                    json: {}
                }
            });
    }

    static fetcher(req, path, errHandler, isFormData) {
        const headersObj = Object.assign(isFormData ? {
            'Cache-Control': 'no-cache',
        } : {
                'content-type': 'application/json',
                'Cache-Control': 'no-cache',
            }, req.headers);
        const headers = new Headers(headersObj);


        const options = Object.assign({
            method: 'POST',
            //credentials: 'same-origin',
        }, req.options);

        options.headers = headers;
        const request = new Request(path, options);
        return fetch(request)
    }
}