import * as types from './../types';

const initialState = {
    tvCount: 2,
    videoContentRows: null,
    duration: '00:00:00',
    canDownload: false,
    images: null,
    tvTemplate: null,
    shops: null,
    products: null,
    selectedShop: null,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case types.SET_TV_TEMPLATE:
            return {
                ...state,
                tvTemplate: action.tvTemplate,
                tvCount: action.tvCount,
            }
        case types.GET_SUCCESS_SHOPS:
            return {
                ...state,
                shops: action.shops
            }
        case types.GET_SUCCESS_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state
    }
};

export default globalReducer;