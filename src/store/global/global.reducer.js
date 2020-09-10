import * as types from './../types';

const initialState = {
    collapsed: false,
    tvCount: 2,
    videoContentRows: null,
    duration: '00:00:00',
    canDownload: true,
    images: null
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.COLLAPSED:
            return {
                ...state,
                collapsed: action.status
            }
        case types.GET_SUCCESS_IMAGES:
            return {
                ...state,
                images: action.images,
            }
        case types.SET_STORE_VALUE:
            return {
                ...state,
                [action.name]: action.value,
            }
        case types.ADD_NEW_ROW:
            return {
                ...state,
                videoContentRows: [...state.videoContentRows, action.row],
            }
        case types.ROW_CHANGED:
            return {
                ...state,
                videoContentRows: action.newRows,
            }
        default:
            return state
    }
};

export default globalReducer;