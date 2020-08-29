import * as types from './../types';

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
