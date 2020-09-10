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
        console.log(data)
        const options = {
            method: 'POST',
            body: data,
        };
        return this.send({ path: '/load-video', options }, true);
    }

}

export default new VideoServices();