import * as types from './../constants/ActionTypes';

var InitialState = false
const onCreate = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_IS_ON_CREATE:
            if (typeof action.value !== 'undefined') {
                state = action.value;
            }
            return state;
        default:
            return state;
    }
};
export default onCreate;