import * as types from './../types';

const initialState = {
    collapsed: false,
    tvCount: 2,
    videoContentRows: null,
    duration: '00:00:00',
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.COLLAPSED:
            return {
                ...state,
                collapsed: action.status
            }
        case types.SET_STORE_VALUE:
            return {
                ...state,
                [action.name]: action.value,
            }
        default:
            return state
    }
};

export default globalReducer;