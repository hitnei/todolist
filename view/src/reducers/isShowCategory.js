import * as types from './../constants/ActionTypes';

var InitialState = true
const isShowCategory = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_IS_SHOW_CATEGORY:
            if (typeof action.value !== 'undefined') {
                state = action.value;
            }
            return state;
        default:
            return state;
    }
};
export default isShowCategory;