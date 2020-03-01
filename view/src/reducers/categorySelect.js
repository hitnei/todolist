import * as types from './../constants/ActionTypes';

var InitialState = 'all'
const categorySelect = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_CATEGORY_SELECT:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default categorySelect;