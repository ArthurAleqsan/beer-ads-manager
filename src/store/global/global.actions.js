import * as types from './../types';
import { updateInArray, getTimeValuefromDuration, removeFromArray, getDurationSeconds } from '../../util/helpers';
import VideoServices from '../../services/VideoServices';
import Request from './../../services/Request';

export const collapse = (status) => {
    return {
        type: types.COLLAPSED,
        status
    }
};

export const setStoreValue = (name, value) => {
    return {
        type: types.SET_STORE_VALUE,
        name,
        value
    }
}
export const addNewRow = (dispatch, row) => {
    dispatch(setStoreValue('duration', 60));
    dispatch({
        type: types.ADD_NEW_ROW,
        row
    });
}
export const changeRowContent = (dispatch, getState, key, value, id) => {
    const { videoContentRows: rows } = getState().global;
    if (key == 'dur') {
        const duration = getTimeValuefromDuration(value);
        dispatch(setStoreValue('duration', duration));
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
    dispatch({
        type: types.ROW_CHANGED,
        newRows,
    });
};

export const getImages = (dispatch) => {
    VideoServices.getImages()
        .then((res) => {
            if (res.json.ERR == 0) {
                const images = res.json.DATA.model;
                dispatch({
                    type: types.GET_SUCCESS_IMAGES,
                    images,
                });
            }
        })
};
export const uploadMedia = (dispatch, getState, media) => {
    const form = new FormData();
    const { images } = getState().global;
    form.append('imageFiles[]', media);
    form.append('video', 1)
    VideoServices.uploadMedia(form)
        .then(res => {
            if (res.json.ERR == 0) {
                const key = Object.keys(res.json.DATA.model)[0]
                const image = res.json.DATA.model[key];
                dispatch({
                    type: types.GET_SUCCESS_IMAGES,
                    images: [...images, image],
                });
            }
        })
};

export const generateVideo = (dispatch, getState) => {
    const { videoContentRows } = getState().global;
    const screens = [];
    const rows = [];
    const dur = [];
    for (let i = 0; i < videoContentRows.length; i++) {
        screens.push(i + 1);
        dur.push(videoContentRows[i].dur);
        const arr = videoContentRows.map((r) => r.tv_s[i]);
        rows.push(arr);
    }
    for (let i = 0; i < screens.length; i++) {
        for (let j = 0; j < rows.length; j++) {
            const raw = { "name": "123", "path": "none", "slide": rows[i][j], "time": dur[i], "screen": screens[i] };
            VideoServices.generateVideo(raw)
                .then(r => console.log(r));
        }
    }
}


