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
    getVideos() {
        const options = {
            method: 'POST',
        };
        return this.send({ path: '/list-video', options }, true);
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
    // getShops() {
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify({ TvtemplateSearch: { id: [1] } })
    //     };
    //     return this.send({ path: '/list-shop', options }, true);
    // }
    getProductsForShop(id, tvtemplate) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ shop: [id], tvtemplate })
        };
        return this.send({ path: '/list-product', options }, true);
    }
    getProductsForShopToTemplate(id, tvtemplate) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ ProducttotemplateSearch: { tvtemplate,  } })
        };
        return this.send({ path: '/list-producttotemplate', options }, true);
    }
    addProductsToScreens(data, tvtemplate) {
        const { screen, product } = data
        const options = {
            method: 'POST',
            body: JSON.stringify({ screen, product, tvtemplate })
        };
        return this.send({ path: '/add-producttotemplate', options }, true);
    }
    getShopsTemplatesList(tvtemplate) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ tvtemplate })
        };
        return this.send({ path: '/list-temlatetoshops', options }, true);
    }
}


export default new VideoServices();