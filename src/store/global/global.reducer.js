import * as types from './../types';

const initialState = {
    collapsed: false,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.COLLAPSED:
            return {
                ...state,
                collapsed: action.status
            }
        default:
            return state
    }
};

export default globalReducer;