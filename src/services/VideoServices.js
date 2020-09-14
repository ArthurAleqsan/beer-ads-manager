import Request from './Request';

class VideoServices extends Request {
    constructor() {
        super('');
    }

    getImages() {
        const options = {
            method: 'POST',
        };
        return this.send({ path: '/list-images', options }, true);
    }
    uploadMedia(data) {
        const options = {
            method: 'POST',
            body: data,
        };
        return this.send({ path: '/load-video', options }, true);
    }
    generateVideo(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        return this.send({ path: '/add-video', options }, true);
    }
    getTvTemplates(id) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ TvtemplateSearch: { id } })
        };
        return this.send({ path: '/list-tvtemplate', options }, true);
    }
    getShops() {
        const options = {
            method: 'POST',
        };
        return this.send({ path: '/list-shop', options }, true);
    }
}

export default new VideoServices();