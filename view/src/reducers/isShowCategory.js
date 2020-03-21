import * as types from './../constants/ActionTypes';

var InitialState = true
const isShowCategory = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_IS_SHOW_CATEGORY:
            if (action.value) {
                state = action.value;
            } else {
                state = !state
            }
            return state;
        default:
            return state;
    }
};
export default isShowCategory;