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
    removeImage(id) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ id }),
        };
        return this.send({ path: '/delete-image', options }, true);
    }
    removeProduct(id) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ id }),
        };
        return this.send({ path: '/delete-producttotemplate', options }, true);
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
    getProductsForShop(id) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ shop: [id] })
        };
        return this.send({ path: '/list-product', options }, true);
    }
    getShopsTemplatesList(id) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ tvtemplate: id })
        };
        return this.send({ path: '/list-temlatetoshops', options }, true);
    }
}


export default new VideoServices();