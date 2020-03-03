import * as types from './../constants/ActionTypes';

var InitialState = true
const isDisableEditContent = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_IS_DISABLE_EDIT_CONTENT:
            return !state;
        case types.DISABLE_EDIT_CONTENT:
            return true;
        default:
            return state;
    }
};
export default isDisableEditContent;