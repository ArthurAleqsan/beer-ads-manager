import * as types from './../types';
import { updateInArray, getTimeValuefromDuration, removeFromArray, getDurationSeconds } from '../../util/helpers';
import VideoServices from '../../services/VideoServices';
import { message } from 'antd';

export const setStoreValue = (name, value) => {
    return {
        type: types.SET_STORE_VALUE,
        name,
        value
    }
}
export const addNewRow = (dispatch, row) => {
    dispatch(setStoreValue('duration', 60));
    dispatch(setStoreValue('canDownload', false));
    dispatch({
        type: types.ADD_NEW_ROW,
        row
    });
}
export const changeRowContent = (dispatch, getState, key, value, id) => {
    const { videoContentRows: rows, duration } = getState().global;
    if (key == 'dur') {
        if (rows.length > 1) {
            const _duration = getTimeValuefromDuration(getDurationSeconds(duration) - 60 + value);
            console.log(getDurationSeconds(duration), _duration, value)
            dispatch(setStoreValue('duration', _duration));
        } else {
            const _duration = getTimeValuefromDuration(value);
            dispatch(setStoreValue('duration', _duration));
        }

    }
    let newRows = [...rows];
    const rowItem = newRows.find(r => r.id == id);
    newRows = updateInArray(newRows, item => item.id == id, () => ({ ...rowItem, [key]: value }));
    dispatch({
        type: types.ROW_CHANGED,
        newRows,
    });
};

export const changeItemToTimelineBox = (dispatch, getState, item, id) => {
    const { videoContentRows: rows } = getState().global;
    const splitedId = id.split('_');
    const colId = splitedId[0];
    const rowId = splitedId[1];
    let newRows = [...rows];
    const rowItem = newRows.find(r => r.id == rowId);
    rowItem.tv_s.splice(+colId - 1, 1, item);
    newRows = updateInArray(newRows, item => item.id == rowId, () => rowItem);
    let status = true;
    for (let i = 0; i < newRows.length; i++) {
        for (let j = 0; j < newRows[i].tv_s.length; j++) {
            if (!newRows[i].tv_s[j]) {
                status = false;
            }
        }
    }
    dispatch(setStoreValue('canDownload', status));
    dispatch({
        type: types.ROW_CHANGED,
        newRows,
    });
};

export const getImages = (dispatch) => {
    VideoServices.getImages()
        .then((r) => {
            if (r.json.ERR == 0) {
                const images = r.json.DATA.model;
                dispatch({
                    type: types.GET_SUCCESS_IMAGES,
                    images,
                });
            } else {
                return message.error(r.json.DATA.err_mess);
            }
        })
};
export const removeItem = (dispatch, getState, id, type) => {
    switch (type) {
        case 'image':
            VideoServices.removeImage(id)
                .then(r => {
                    console.log(r);
                    if (r.json.ERR == 0) {
                        const { images } = getState().global;
                        let newImages = [...images];
                        newImages = removeFromArray(newImages, image => image.id == id);
                        dispatch({
                            type: types.GET_SUCCESS_IMAGES,
                            images: newImages,
                        });
                    } else {
                        return message.error(r.json.DATA.err_mess);
                    }
                });
            break;
        case 'video':
            break;
        case 'product':
            VideoServices.removeProduct(id)
                .then(r => {
                    if (r.json.ERR == 0) {
                        const { products } = getState().global;
                        let newProducts = [...products];
                        newProducts = removeFromArray(newProducts, product => product.id == id);
                        dispatch({
                            type: types.GET_SUCCESS_PRODUCTS,
                            products: newProducts,
                        });
                    } else {
                        return message.error(r.json.DATA.err_mess);
                    }
                });
            break;
    }
}
export const getProducts = (dispatch, id) => {
    VideoServices.getProductsForShop(id)
        .then(r => {
            if (r.json.ERR == 0) {
                dispatch({
                    type: types.GET_SUCCESS_PRODUCTS,
                    products: r.json.DATA.model,
                })
            } else {
                return message.error(r.json.DATA.err_mess);
            }
        });
}
export const uploadMedia = (dispatch, getState, media) => {
    const form = new FormData();
    const { images } = getState().global;
    form.append('imageFiles[]', media);
    form.append('video', 1)
    VideoServices.uploadMedia(form)
        .then(res => {
            if (res.json.ERR == 0) {
                const key = Object.keys(res.json.DATA.model)[0];
                const image = res.json.DATA.model[key];
                dispatch({
                    type: types.GET_SUCCESS_IMAGES,
                    images: [...images, image],
                });
            } else {
                return message.error(res.json.DATA.err_mess);
            }
        })
};

export const generateVideo = (dispatch, getState) => {
    const { videoContentRows, tvCount } = getState().global;
    const screens = new Array(tvCount);
    const rows = [];
    const dur = [];

    for (let i = 0; i < videoContentRows.length; i++) {
        dur.push(videoContentRows[i].dur);
        const arr = videoContentRows.map((r) => r.tv_s[i]);
        rows.push(arr);
    }
    for (let i = 0; i < screens.length; i++) {
        const row = videoContentRows.map((r) => r.tv_s[i]);
        for (let j = 0; j < rows.length; j++) {
            const raw = { name: "123", path: "none", slide: row[j], time: dur[j], screen: i + 1 };
            VideoServices.generateVideo(raw)
                .then(r => console.log(r));
        }
    }
}

export const getTvTemplates = (dispatch, id) => {
    VideoServices.getTvTemplates(id)
        .then(r => {
            if (r.json.ERR == 0) {
                if (Object.keys(r.json.DATA.model.length == 1)) {
                    Object.keys(r.json.DATA.model).forEach(k => {
                        const template = r.json.DATA.model[k];
                        dispatch({
                            type: types.SET_TV_TEMPLATE,
                            tvTemplate: template,
                            tvCount: template.screens,
                        });

                    })
                } else {
                    return message.error('Выберите шаблон.')
                }
            }
        })
};

export const getShops = (dispatch) => {
    VideoServices.getShops()
        .then(r => {
            if (r.json.ERR == 0) {
                const data = r.json.DATA.model;
                dispatch({
                    type: types.GET_SUCCESS_SHOPS,
                    shops: data,
                });
            } else {
                return message.error(r.json.DATA.err_mess);
            }
        })
};
export const getShopTemplates = (dispatch, id) => {
    VideoServices.getShopsTemplatesList(id)
        .then(r => console.log(r));
}
