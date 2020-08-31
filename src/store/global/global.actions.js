import * as types from './../types';
import { updateInArray, getTimeValuefromDuration } from '../../util/helpers';

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
        console.log(duration)
        dispatch(setStoreValue('duration', duration));
    }
    let newRows = [...rows];
    const rowItem = newRows.find(r => r.id == id);
    newRows = updateInArray(newRows, item => item.id == id, () => ({ ...rowItem, [key]: value }));
    dispatch({
        type: types.ROW_CHANGED,
        newRows,
    });
}