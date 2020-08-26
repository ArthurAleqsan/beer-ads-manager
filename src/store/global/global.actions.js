import * as types from './../types';

export const collapse = (status) => {
    return {
        type: types.COLLAPSED,
        status
    }
}
